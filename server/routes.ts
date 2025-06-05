import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTemplateSchema, insertPageSchema } from "@shared/schema";
import { z } from "zod";
import archiver from "archiver";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Template routes
  app.get("/api/templates", async (req, res) => {
    try {
      const templates = await storage.getTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const template = await storage.getTemplate(id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const templateData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(templateData);
      res.status(201).json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid template data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create template" });
    }
  });

  app.put("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertTemplateSchema.partial().parse(req.body);
      const template = await storage.updateTemplate(id, updates);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid template data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update template" });
    }
  });

  app.delete("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteTemplate(id);
      if (!deleted) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete template" });
    }
  });

  // Page routes
  app.get("/api/templates/:templateId/pages", async (req, res) => {
    try {
      const templateId = parseInt(req.params.templateId);
      const pages = await storage.getTemplatePages(templateId);
      res.json(pages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const page = await storage.getPage(id);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch page" });
    }
  });

  app.post("/api/pages", async (req, res) => {
    try {
      const pageData = insertPageSchema.parse(req.body);
      const page = await storage.createPage(pageData);
      res.status(201).json(page);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid page data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create page" });
    }
  });

  app.put("/api/pages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertPageSchema.partial().parse(req.body);
      const page = await storage.updatePage(id, updates);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid page data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update page" });
    }
  });

  app.delete("/api/pages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePage(id);
      if (!deleted) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete page" });
    }
  });

  // Export template as ZIP
  app.post("/api/templates/:id/export", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const template = await storage.getTemplate(id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }

      const pages = await storage.getTemplatePages(id);
      
      // Set response headers for ZIP download
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="${template.name || 'wordpress-template'}.zip"`);

      // Create archive
      const archive = archiver('zip', {
        zlib: { level: 9 }
      });

      archive.pipe(res);

      // Generate WordPress template files
      const templateFiles = generateWordPressTemplate(template, pages);
      
      // Add files to archive
      for (const [filename, content] of Object.entries(templateFiles)) {
        archive.append(content, { name: filename });
      }

      await archive.finalize();
    } catch (error) {
      console.error('Export error:', error);
      res.status(500).json({ message: "Failed to export template" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generateWordPressTemplate(template: any, pages: any[]) {
  const files: Record<string, string> = {};

  // Generate style.css (theme header)
  files['style.css'] = `/*
Theme Name: ${template.name || 'Custom Theme'}
Description: ${template.description || 'A custom WordPress theme generated with Template Builder'}
Author: ${template.author || 'Template Builder'}
Version: ${template.version || '1.0.0'}
*/

/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Component styles will be generated based on components used */
`;

  // Generate functions.php
  files['functions.php'] = `<?php
function ${template.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'custom'}_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // Register navigation menu
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'textdomain'),
    ));
}
add_action('after_setup_theme', '${template.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'custom'}_theme_setup');

function ${template.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'custom'}_scripts() {
    wp_enqueue_style('theme-style', get_stylesheet_uri());
    wp_enqueue_script('theme-script', get_template_directory_uri() . '/js/main.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', '${template.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'custom'}_scripts');
?>`;

  // Generate header.php
  files['header.php'] = `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>`;

  // Generate footer.php
  files['footer.php'] = `
<?php wp_footer(); ?>
</body>
</html>`;

  // Generate page templates
  for (const page of pages) {
    const filename = page.isHomePage ? 'index.php' : `page-${page.slug}.php`;
    files[filename] = generatePageTemplate(page);
  }

  // Generate main.js
  files['js/main.js'] = `
// Custom JavaScript for the theme
document.addEventListener('DOMContentLoaded', function() {
    // Add any custom functionality here
    console.log('Theme loaded successfully');
});
`;

  return files;
}

function generatePageTemplate(page: any): string {
  let template = `<?php get_header(); ?>

<main id="main" class="site-main">
`;

  // Generate PHP code for each component
  if (page.components && Array.isArray(page.components)) {
    for (const component of page.components) {
      template += generateComponentPHP(component);
    }
  }

  template += `
</main>

<?php get_footer(); ?>`;

  return template;
}

function generateComponentPHP(component: any): string {
  const { type, properties } = component;
  
  switch (type) {
    case 'navbar':
      return `
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a>
            </div>
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_class' => 'nav-menu',
                'container' => 'div',
                'container_class' => 'nav-menu-container'
            ));
            ?>
        </div>
    </nav>
`;

    case 'hero':
      return `
    <!-- Hero Section -->
    <section class="hero-section" style="background: ${properties?.background || 'linear-gradient(to right, #2563eb, #7c3aed)'};">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">${properties?.title || 'Welcome to Our Site'}</h1>
                <p class="hero-subtitle">${properties?.subtitle || 'Create amazing experiences'}</p>
                ${properties?.buttonText ? `<a href="${properties?.buttonLink || '#'}" class="hero-button">${properties.buttonText}</a>` : ''}
            </div>
        </div>
    </section>
`;

    case 'gallery':
      return `
    <!-- Gallery Section -->
    <section class="gallery-section">
        <div class="container">
            <h2>Gallery</h2>
            <div class="gallery-grid">
                <?php
                $images = get_field('gallery_images');
                if ($images):
                    foreach ($images as $image):
                ?>
                <div class="gallery-item">
                    <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>">
                </div>
                <?php
                    endforeach;
                endif;
                ?>
            </div>
        </div>
    </section>
`;

    case 'contact':
      return `
    <!-- Contact Section -->
    <section class="contact-section">
        <div class="container">
            <h2>Contact Us</h2>
            <div class="contact-content">
                <div class="contact-form">
                    <?php echo do_shortcode('[contact-form-7 id="1" title="Contact form 1"]'); ?>
                </div>
                <div class="contact-info">
                    <div class="contact-item">
                        <h4>Address</h4>
                        <p>${properties?.address || '123 Business St, City, State 12345'}</p>
                    </div>
                    <div class="contact-item">
                        <h4>Phone</h4>
                        <p>${properties?.phone || '(555) 123-4567'}</p>
                    </div>
                    <div class="contact-item">
                        <h4>Email</h4>
                        <p>${properties?.email || 'contact@example.com'}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

    case 'faq':
      return `
    <!-- FAQ Section -->
    <section class="faq-section">
        <div class="container">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-list">
                <?php
                $faqs = get_field('faq_items');
                if ($faqs):
                    foreach ($faqs as $faq):
                ?>
                <div class="faq-item">
                    <h3 class="faq-question"><?php echo esc_html($faq['question']); ?></h3>
                    <div class="faq-answer"><?php echo wp_kses_post($faq['answer']); ?></div>
                </div>
                <?php
                    endforeach;
                endif;
                ?>
            </div>
        </div>
    </section>
`;

    case 'footer':
      return `
    <!-- Footer Section -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3><?php bloginfo('name'); ?></h3>
                    <p><?php bloginfo('description'); ?></p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_class' => 'footer-menu',
                        'container' => 'ul'
                    ));
                    ?>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
            </div>
        </div>
    </footer>
`;

    default:
      return `<!-- Unknown component type: ${type} -->`;
  }
}
