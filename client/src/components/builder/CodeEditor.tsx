import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Save, FileText, Code, Palette } from 'lucide-react';
import type { TemplateComponent } from '@/types/template';

interface CodeEditorProps {
  components: TemplateComponent[];
}

const FILE_TEMPLATES = {
  'index.php': (components: TemplateComponent[]) => `<?php get_header(); ?>

<main id="main" class="site-main">
${components.map(component => generateComponentPHP(component)).join('\n')}
</main>

<?php get_footer(); ?>`,

  'style.css': () => `/*
Theme Name: Generated Template
Description: A custom WordPress theme created with the template builder
Version: 1.0.0
Author: Template Builder
*/

/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Component styles */
.navbar {
    background: #fff;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem 0;
}

.hero-section {
    padding: 6rem 0;
    text-align: center;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 4rem 0;
}

.contact-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 4rem 0;
}

.faq-section {
    padding: 4rem 0;
}

.footer {
    background: #1f2937;
    color: white;
    padding: 3rem 0;
}

/* Responsive design */
@media (max-width: 768px) {
    .gallery-grid {
        grid-template-columns: 1fr;
    }
}`,

  'functions.php': () => `<?php
// Theme setup
function generated_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('menus');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'textdomain'),
    ));
}
add_action('after_setup_theme', 'generated_theme_setup');

// Enqueue styles
function generated_theme_styles() {
    wp_enqueue_style('theme-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'generated_theme_styles');

// Customizer settings
function generated_theme_customize_register($wp_customize) {
    // Hero section
    $wp_customize->add_section('hero_section', array(
        'title' => __('Hero Section', 'textdomain'),
        'priority' => 30,
    ));
    
    $wp_customize->add_setting('hero_title', array(
        'default' => 'Welcome to Our Site',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('hero_title', array(
        'label' => __('Hero Title', 'textdomain'),
        'section' => 'hero_section',
        'type' => 'text',
    ));
}
add_action('customize_register', 'generated_theme_customize_register');
?>`,

  'header.php': () => `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>`,

  'footer.php': () => `<?php wp_footer(); ?>
</body>
</html>`
};

function generateComponentPHP(component: TemplateComponent): string {
  switch (component.type) {
    case 'navbar':
      return `
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
                <h1><?php bloginfo('name'); ?></h1>
            </div>
            <?php wp_nav_menu(array('theme_location' => 'primary', 'container_class' => 'navbar-nav')); ?>
        </div>
    </nav>`;

    case 'hero':
      return `
    <!-- Hero Section -->
    <section class="hero-section" style="background: ${component.props.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};">
        <div class="container">
            <h1><?php echo get_theme_mod('hero_title', '${component.props.title || 'Welcome to Our Site'}'); ?></h1>
            <p><?php echo get_theme_mod('hero_subtitle', '${component.props.subtitle || 'Create amazing experiences'}'); ?></p>
            <?php if ($button_text = '${component.props.buttonText || 'Get Started'}'): ?>
                <a href="<?php echo esc_url('${component.props.buttonLink || '#'}'); ?>" class="btn btn-primary"><?php echo esc_html($button_text); ?></a>
            <?php endif; ?>
        </div>
    </section>`;

    case 'gallery':
      return `
    <!-- Gallery Section -->
    <section class="gallery-section">
        <div class="container">
            <h2>${component.props.title || 'Our Gallery'}</h2>
            <div class="gallery-grid">
                <?php
                $gallery_images = get_field('gallery_images');
                if ($gallery_images):
                    foreach ($gallery_images as $image):
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
    </section>`;

    case 'contact':
      return `
    <!-- Contact Section -->
    <section class="contact-section">
        <div class="container">
            <h2>${component.props.title || 'Contact Us'}</h2>
            <div class="contact-form">
                <?php echo do_shortcode('[contact-form-7 id="1" title="Contact form 1"]'); ?>
            </div>
        </div>
    </section>`;

    case 'faq':
      return `
    <!-- FAQ Section -->
    <section class="faq-section">
        <div class="container">
            <h2>${component.props.title || 'Frequently Asked Questions'}</h2>
            <div class="faq-items">
                <?php
                $faq_items = get_field('faq_items');
                if ($faq_items):
                    foreach ($faq_items as $item):
                ?>
                    <div class="faq-item">
                        <h3><?php echo esc_html($item['question']); ?></h3>
                        <p><?php echo esc_html($item['answer']); ?></p>
                    </div>
                <?php
                    endforeach;
                endif;
                ?>
            </div>
        </div>
    </section>`;

    case 'footer':
      return `
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3><?php bloginfo('name'); ?></h3>
                    <p><?php bloginfo('description'); ?></p>
                </div>
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <p>${component.props.address || '123 Business St, City, State 12345'}</p>
                    <p>${component.props.phone || '(555) 123-4567'}</p>
                    <p>${component.props.email || 'contact@example.com'}</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
            </div>
        </div>
    </footer>`;

    default:
      return `<!-- ${component.type} component -->`;
  }
}

export function CodeEditor({ components }: CodeEditorProps) {
  const [selectedFile, setSelectedFile] = useState<string>('index.php');

  const fileOptions = [
    { value: 'index.php', label: 'index.php', icon: FileText },
    { value: 'style.css', label: 'style.css', icon: Palette },
    { value: 'functions.php', label: 'functions.php', icon: Code },
    { value: 'header.php', label: 'header.php', icon: FileText },
    { value: 'footer.php', label: 'footer.php', icon: FileText },
  ];

  const getCurrentFileContent = () => {
    const template = FILE_TEMPLATES[selectedFile as keyof typeof FILE_TEMPLATES];
    return template ? template(components) : '';
  };

  const getFileLanguage = () => {
    if (selectedFile.endsWith('.php')) return 'php';
    if (selectedFile.endsWith('.css')) return 'css';
    return 'text';
  };

  return (
    <div className="max-w-full mx-auto h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Template Code
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Select value={selectedFile} onValueChange={setSelectedFile}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fileOptions.map(option => {
                    const IconComponent = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center">
                          <IconComponent className="w-4 h-4 mr-2" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Button size="sm">
                <Save className="w-4 h-4 mr-2" />
                Apply Changes
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {getFileLanguage().toUpperCase()}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Generated from {components.length} component{components.length !== 1 ? 's' : ''}
            </span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0">
          <div className="h-full bg-slate-900 text-slate-100 p-4 overflow-auto">
            <pre className="text-sm font-mono leading-relaxed">
              <code className={`language-${getFileLanguage()}`}>
                {getCurrentFileContent()}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
