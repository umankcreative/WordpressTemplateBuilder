import { Component } from "@shared/schema";

export function generateWordPressCode(components: Component[]): Record<string, string> {
  const files: Record<string, string> = {};

  // Generate style.css
  files["style.css"] = generateStyleCSS(components);

  // Generate index.php
  files["index.php"] = generateIndexPHP(components);

  // Generate header.php
  files["header.php"] = generateHeaderPHP();

  // Generate footer.php
  files["footer.php"] = generateFooterPHP();

  // Generate functions.php
  files["functions.php"] = generateFunctionsPHP();

  return files;
}

function generateStyleCSS(components: Component[]): string {
  let css = `/*
Theme Name: Custom Template
Description: A custom WordPress theme generated with Template Builder
Version: 1.0.0
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

/* Component styles */
`;

  // Generate component-specific CSS
  components.forEach((component) => {
    css += generateComponentCSS(component);
  });

  return css;
}

function generateComponentCSS(component: Component): string {
  const { type, properties } = component;

  switch (type) {
    case "navbar":
      return `
/* Navigation Bar */
.navbar {
  background-color: ${properties.backgroundColor || "#ffffff"};
  color: ${properties.textColor || "#333333"};
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.nav-brand a {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-menu a {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #2563eb;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}
`;

    case "hero":
      const background = properties.backgroundType === "gradient"
        ? `linear-gradient(to right, ${properties.startColor || "#2563eb"}, ${properties.endColor || "#7c3aed"})`
        : properties.backgroundColor || "#2563eb";

      return `
/* Hero Section */
.hero-section {
  background: ${background};
  color: ${properties.textColor || "#ffffff"};
  padding: ${properties.paddingTop || 80}px 0 ${properties.paddingBottom || 80}px 0;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-button {
  display: inline-block;
  background: #ffffff;
  color: #2563eb;
  padding: 0.75rem 2rem;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.3s;
}

.hero-button:hover {
  background: #f3f4f6;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
}
`;

    case "gallery":
      return `
/* Gallery Section */
.gallery-section {
  padding: ${properties.paddingTop || 60}px 0 ${properties.paddingBottom || 60}px 0;
  background: #f9fafb;
}

.gallery-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(${properties.columns || 3}, 1fr);
  gap: 1.5rem;
}

.gallery-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 0.5rem;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
`;

    case "contact":
      return `
/* Contact Section */
.contact-section {
  padding: ${properties.paddingTop || 60}px 0 ${properties.paddingBottom || 60}px 0;
}

.contact-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.contact-form button {
  width: 100%;
  background: #2563eb;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.contact-item {
  margin-bottom: 1.5rem;
}

.contact-item h4 {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
`;

    case "faq":
      return `
/* FAQ Section */
.faq-section {
  padding: ${properties.paddingTop || 60}px 0 ${properties.paddingBottom || 60}px 0;
  background: #f9fafb;
}

.faq-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
}

.faq-item {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.faq-question {
  font-weight: 600;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.faq-answer {
  color: #6b7280;
}
`;

    case "footer":
      return `
/* Footer Section */
.site-footer {
  background: ${properties.backgroundColor || "#1f2937"};
  color: ${properties.textColor || "#ffffff"};
  padding: ${properties.paddingTop || 40}px 0 ${properties.paddingBottom || 40}px 0;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
}

.footer-menu {
  list-style: none;
}

.footer-menu a {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-menu a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #374151;
  color: #9ca3af;
}
`;

    default:
      return "";
  }
}

function generateIndexPHP(components: Component[]): string {
  let php = `<?php get_header(); ?>

<main id="main" class="site-main">
`;

  components.forEach((component) => {
    php += generateComponentPHP(component);
  });

  php += `
</main>

<?php get_footer(); ?>`;

  return php;
}

function generateComponentPHP(component: Component): string {
  const { type, properties } = component;

  switch (type) {
    case "navbar":
      return `
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <a href="<?php echo home_url(); ?>"><?php echo esc_html('${properties.title || 'Your Site'}'); ?></a>
            </div>
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_class' => 'nav-menu',
                'container' => 'ul'
            ));
            ?>
        </div>
    </nav>
`;

    case "hero":
      return `
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <h1 class="hero-title"><?php echo esc_html('${properties.title || 'Welcome to Our Site'}'); ?></h1>
            <p class="hero-subtitle"><?php echo esc_html('${properties.subtitle || 'Create amazing experiences'}'); ?></p>
            ${properties.buttonText ? `<a href="${properties.buttonLink || '#'}" class="hero-button"><?php echo esc_html('${properties.buttonText}'); ?></a>` : ''}
        </div>
    </section>
`;

    case "gallery":
      return `
    <!-- Gallery Section -->
    <section class="gallery-section">
        <div class="container">
            <h2><?php echo esc_html('${properties.title || 'Our Gallery'}'); ?></h2>
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
                else:
                    // Display placeholder images
                    for ($i = 0; $i < ${properties.columns || 3}; $i++):
                ?>
                <div class="gallery-item">
                    <img src="https://via.placeholder.com/400x250" alt="Gallery Image">
                </div>
                <?php
                    endfor;
                endif;
                ?>
            </div>
        </div>
    </section>
`;

    case "contact":
      return `
    <!-- Contact Section -->
    <section class="contact-section">
        <div class="container">
            <h2><?php echo esc_html('${properties.title || 'Contact Us'}'); ?></h2>
            <div class="contact-content">
                <div class="contact-form">
                    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                        <input type="hidden" name="action" value="contact_form">
                        <input type="text" name="name" placeholder="Your Name" required>
                        <input type="email" name="email" placeholder="Your Email" required>
                        <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
                <div class="contact-info">
                    <div class="contact-item">
                        <h4>Address</h4>
                        <p><?php echo esc_html('${properties.address || '123 Business St, City, State 12345'}'); ?></p>
                    </div>
                    <div class="contact-item">
                        <h4>Phone</h4>
                        <p><?php echo esc_html('${properties.phone || '(555) 123-4567'}'); ?></p>
                    </div>
                    <div class="contact-item">
                        <h4>Email</h4>
                        <p><?php echo esc_html('${properties.email || 'contact@example.com'}'); ?></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

    case "faq":
      return `
    <!-- FAQ Section -->
    <section class="faq-section">
        <div class="container">
            <h2><?php echo esc_html('${properties.title || 'Frequently Asked Questions'}'); ?></h2>
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
                else:
                    // Display sample FAQs
                ?>
                <div class="faq-item">
                    <h3 class="faq-question">How do I get started?</h3>
                    <div class="faq-answer">Simply sign up for an account and follow our easy setup wizard.</div>
                </div>
                <div class="faq-item">
                    <h3 class="faq-question">What payment methods do you accept?</h3>
                    <div class="faq-answer">We accept all major credit cards and PayPal.</div>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
`;

    case "footer":
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
                <p><?php echo esc_html('${properties.text || '© 2024 Your Company. All rights reserved.'}'); ?></p>
            </div>
        </div>
    </footer>
`;

    default:
      return `<!-- Unknown component type: ${type} -->`;
  }
}

function generateHeaderPHP(): string {
  return `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>`;
}

function generateFooterPHP(): string {
  return `
<?php wp_footer(); ?>
</body>
</html>`;
}

function generateFunctionsPHP(): string {
  return `<?php
function custom_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'textdomain'),
        'footer' => __('Footer Menu', 'textdomain'),
    ));
}
add_action('after_setup_theme', 'custom_theme_setup');

function custom_theme_scripts() {
    wp_enqueue_style('theme-style', get_stylesheet_uri());
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
}
add_action('wp_enqueue_scripts', 'custom_theme_scripts');

// Handle contact form submission
function handle_contact_form() {
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
        $name = sanitize_text_field($_POST['name']);
        $email = sanitize_email($_POST['email']);
        $message = sanitize_textarea_field($_POST['message']);
        
        $to = get_option('admin_email');
        $subject = 'Contact Form Submission from ' . $name;
        $body = "Name: $name\\nEmail: $email\\nMessage: $message";
        $headers = array('Content-Type: text/plain; charset=UTF-8');
        
        wp_mail($to, $subject, $body, $headers);
        
        wp_redirect(home_url('/?contact=success'));
        exit;
    }
}
add_action('admin_post_nopriv_contact_form', 'handle_contact_form');
add_action('admin_post_contact_form', 'handle_contact_form');
?>`;
}
