import { Component } from "@shared/schema";

// Component renderers for the canvas
export function getComponentRegistry() {
  return {
    navbar: NavbarRenderer,
    hero: HeroRenderer,
    gallery: GalleryRenderer,
    contact: ContactRenderer,
    faq: FaqRenderer,
    footer: FooterRenderer,
    "social-proof": SocialProofRenderer,
    cta: CtaRenderer,
    "value-proposition": ValuePropositionRenderer,
    "client-logos": ClientLogosRenderer,
    pricing: PricingRenderer,
    "trust-signals": TrustSignalsRenderer,
    video: VideoRenderer,
    images: ImagesRenderer,
    features: FeaturesRenderer,
    text: TextRenderer,
    headline: HeadlineRenderer,
    subheading: SubheadingRenderer,
    team: TeamRenderer,
    testimonials: TestimonialsRenderer,
    stats: StatsRenderer,
    about: AboutRenderer,
  };
}

function NavbarRenderer({ properties }: { properties: Record<string, any> }) {
  const menuItems = (properties.menuItems || "Home,About,Services,Contact").split(",");

  return (
    <nav 
      className="px-6 py-4 border-b border-gray-200"
      style={{ 
        backgroundColor: properties.backgroundColor || "#ffffff",
        color: properties.textColor || "#333333"
      }}
    >
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">
          {properties.title || "Your Site"}
        </div>
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item, index) => (
            <a 
              key={index}
              href="#" 
              className="hover:text-blue-600 transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              {item.trim()}
            </a>
          ))}
        </div>
        <button className="md:hidden">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
}

function HeroRenderer({ properties }: { properties: Record<string, any> }) {
  const getBackgroundStyle = () => {
    if (properties.backgroundType === "gradient") {
      return {
        background: `linear-gradient(to right, ${properties.startColor || "#2563eb"}, ${properties.endColor || "#7c3aed"})`
      };
    } else if (properties.backgroundType === "color") {
      return {
        backgroundColor: properties.backgroundColor || "#2563eb"
      };
    } else if (properties.backgroundType === "image" && properties.backgroundImage) {
      return {
        backgroundImage: `url(${properties.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      };
    }
    return {
      background: `linear-gradient(to right, ${properties.startColor || "#2563eb"}, ${properties.endColor || "#7c3aed"})`
    };
  };

  return (
    <div 
      className="py-20 px-6 text-center"
      style={{
        ...getBackgroundStyle(),
        color: properties.textColor || "#ffffff",
        paddingTop: `${properties.paddingTop || 80}px`,
        paddingBottom: `${properties.paddingBottom || 80}px`,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          {properties.title || "Welcome to Our Site"}
        </h1>
        <p className="text-xl mb-8 opacity-90">
          {properties.subtitle || "Create amazing experiences with our platform"}
        </p>
        {properties.buttonText && (
          <button 
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            {properties.buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

function GalleryRenderer({ properties }: { properties: Record<string, any> }) {
  const columns = parseInt(properties.columns || "3");
  
  return (
    <div 
      className="bg-gray-50 px-6"
      style={{
        paddingTop: `${properties.paddingTop || 60}px`,
        paddingBottom: `${properties.paddingBottom || 60}px`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {properties.title || "Our Gallery"}
        </h2>
        <div 
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`
          }}
        >
          {Array.from({ length: columns * 2 }).map((_, index) => (
            <div key={index} className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
              <i className="fas fa-image text-4xl text-gray-400"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactRenderer({ properties }: { properties: Record<string, any> }) {
  return (
    <div 
      className="bg-white px-6"
      style={{
        paddingTop: `${properties.paddingTop || 60}px`,
        paddingBottom: `${properties.paddingBottom || 60}px`,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {properties.title || "Contact Us"}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                readOnly
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                readOnly
              />
              <textarea 
                placeholder="Your Message" 
                rows={5} 
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                readOnly
              />
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Address</h4>
                <p className="text-gray-600">{properties.address || "123 Business St, City, State 12345"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-phone text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Phone</h4>
                <p className="text-gray-600">{properties.phone || "(555) 123-4567"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-envelope text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="text-gray-600">{properties.email || "contact@example.com"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqRenderer({ properties }: { properties: Record<string, any> }) {
  const sampleFaqs = [
    {
      question: "How do I get started?",
      answer: "Simply sign up for an account and follow our easy setup wizard."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards and PayPal."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time from your account settings."
    }
  ];

  return (
    <div 
      className="bg-gray-50 px-6"
      style={{
        paddingTop: `${properties.paddingTop || 60}px`,
        paddingBottom: `${properties.paddingBottom || 60}px`,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {properties.title || "Frequently Asked Questions"}
        </h2>
        <div className="space-y-4">
          {sampleFaqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                <i className="fas fa-chevron-down text-gray-500"></i>
              </div>
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterRenderer({ properties }: { properties: Record<string, any> }) {
  return (
    <footer 
      className="text-white py-12 px-6"
      style={{
        backgroundColor: properties.backgroundColor || "#1f2937",
        color: properties.textColor || "#ffffff",
        paddingTop: `${properties.paddingTop || 40}px`,
        paddingBottom: `${properties.paddingBottom || 40}px`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Your Site</h3>
            <p className="text-gray-400">Building amazing experiences for our users worldwide.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white" onClick={(e) => e.preventDefault()}>Home</a></li>
              <li><a href="#" className="hover:text-white" onClick={(e) => e.preventDefault()}>About</a></li>
              <li><a href="#" className="hover:text-white" onClick={(e) => e.preventDefault()}>Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white" onClick={(e) => e.preventDefault()}>Contact</a></li>
              <li><a href="#" className="hover:text-white" onClick={(e) => e.preventDefault()}>Help Center</a></li>
              <li><a href="#" className="hover:text-white" onClick={(e) => e.preventDefault()}>Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{properties.text || "© 2024 Your Company. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
}

// New Component Renderers
function SocialProofRenderer({ properties }: { properties: Record<string, any> }) {
  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-600 mb-8">{properties.subtitle || "Trusted by thousands of companies worldwide"}</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-gray-200 h-12 rounded flex items-center justify-center">
              <span className="text-gray-500 font-semibold">LOGO {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CtaRenderer({ properties }: { properties: Record<string, any> }) {
  return (
    <div 
      className="py-16 px-6 text-center"
      style={{
        backgroundColor: properties.backgroundColor || "#2563eb",
        color: properties.textColor || "#ffffff",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          {properties.title || "Ready to Get Started?"}
        </h2>
        <p className="text-xl mb-8 opacity-90">
          {properties.subtitle || "Join thousands of satisfied customers today"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            {properties.primaryButton || "Get Started Free"}
          </button>
          <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
            {properties.secondaryButton || "Learn More"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ValuePropositionRenderer({ properties }: { properties: Record<string, any> }) {
  const benefits = [
    { title: "Fast & Reliable", description: "Lightning-fast performance you can count on" },
    { title: "Easy to Use", description: "Intuitive interface that anyone can master" },
    { title: "24/7 Support", description: "Round-the-clock assistance when you need it" }
  ];

  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {properties.title || "Why Choose Us?"}
          </h2>
          <p className="text-xl text-gray-600">
            {properties.subtitle || "Discover the benefits that set us apart"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClientLogosRenderer({ properties }: { properties: Record<string, any> }) {
  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-center text-gray-600 mb-8 text-lg">
          {properties.title || "Trusted by leading companies"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-100 h-16 rounded flex items-center justify-center">
              <span className="text-gray-400 font-semibold text-sm">CLIENT {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingRenderer({ properties }: { properties: Record<string, any> }) {
  const plans = [
    { name: "Basic", price: "$9", features: ["Feature 1", "Feature 2", "Feature 3"] },
    { name: "Pro", price: "$29", features: ["All Basic features", "Feature 4", "Feature 5", "Priority Support"], popular: true },
    { name: "Enterprise", price: "$99", features: ["All Pro features", "Custom integrations", "Dedicated support"] }
  ];

  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {properties.title || "Simple, Transparent Pricing"}
          </h2>
          <p className="text-xl text-gray-600">
            {properties.subtitle || "Choose the plan that's right for you"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-lg p-8 shadow-sm ${plan.popular ? 'ring-2 ring-blue-500 relative' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gray-600">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustSignalsRenderer({ properties }: { properties: Record<string, any> }) {
  const badges = [
    { name: "SSL Secured", icon: "fas fa-shield-alt" },
    { name: "Money Back Guarantee", icon: "fas fa-money-bill-wave" },
    { name: "24/7 Support", icon: "fas fa-headset" },
    { name: "99.9% Uptime", icon: "fas fa-server" }
  ];

  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <i className={`${badge.icon} text-green-600 text-xl`}></i>
              </div>
              <span className="text-sm font-semibold text-gray-700">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoRenderer({ properties }: { properties: Record<string, any> }) {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {properties.title || "Watch Our Demo"}
          </h2>
          <p className="text-xl text-gray-600">
            {properties.subtitle || "See how our solution works in action"}
          </p>
        </div>
        <div className="bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-play text-2xl"></i>
            </div>
            <p className="text-lg">Click to play video</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagesRenderer({ properties }: { properties: Record<string, any> }) {
  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {properties.title && (
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {properties.title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: parseInt(properties.imageCount) || 3 }).map((_, index) => (
            <div key={index} className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
              <i className="fas fa-image text-4xl text-gray-400"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturesRenderer({ properties }: { properties: Record<string, any> }) {
  const features = [
    { title: "Advanced Analytics", description: "Get detailed insights into your performance", icon: "fas fa-chart-line" },
    { title: "Team Collaboration", description: "Work together seamlessly with your team", icon: "fas fa-users" },
    { title: "Custom Integrations", description: "Connect with your favorite tools", icon: "fas fa-plug" },
    { title: "Mobile Optimized", description: "Perfect experience on any device", icon: "fas fa-mobile-alt" },
    { title: "Security First", description: "Enterprise-grade security for your data", icon: "fas fa-lock" },
    { title: "24/7 Support", description: "Round-the-clock assistance when you need it", icon: "fas fa-headset" }
  ];

  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {properties.title || "Powerful Features"}
          </h2>
          <p className="text-xl text-gray-600">
            {properties.subtitle || "Everything you need to succeed"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center md:text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
                <i className={`${feature.icon} text-blue-600`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TextRenderer({ properties }: { properties: Record<string, any> }) {
  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {properties.title || "Your Content Title"}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {properties.content || "Your content goes here. This is a flexible text block that can contain any type of content you want to display on your website. You can customize the text, formatting, and styling through the properties panel."}
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadlineRenderer({ properties }: { properties: Record<string, any> }) {
  return (
    <div className="py-8 px-6 text-center">
      <h1 
        className="font-bold leading-tight"
        style={{
          fontSize: `${properties.fontSize || 48}px`,
          color: properties.textColor || "#1f2937",
        }}
      >
        {properties.text || "Your Amazing Headline"}
      </h1>
    </div>
  );
}

function SubheadingRenderer({ properties }: { properties: Record<string, any> }) {
  return (
    <div className="py-4 px-6 text-center">
      <p 
        className="leading-relaxed"
        style={{
          fontSize: `${properties.fontSize || 20}px`,
          color: properties.textColor || "#6b7280",
        }}
      >
        {properties.text || "Supporting text that provides additional context and information"}
      </p>
    </div>
  );
}

function TeamRenderer({ properties }: { properties: Record<string, any> }) {
  const teamMembers = [
    { name: "John Doe", role: "CEO & Founder", image: "" },
    { name: "Jane Smith", role: "CTO", image: "" },
    { name: "Mike Johnson", role: "Lead Designer", image: "" },
    { name: "Sarah Wilson", role: "Marketing Director", image: "" }
  ];

  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {properties.title || "Meet Our Team"}
          </h2>
          <p className="text-xl text-gray-600">
            {properties.subtitle || "The talented people behind our success"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user text-4xl text-gray-500"></i>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsRenderer({ properties }: { properties: Record<string, any> }) {
  const testimonials = [
    { quote: "This product has transformed our business completely.", author: "John Smith", company: "Tech Corp" },
    { quote: "Outstanding support and amazing features.", author: "Sarah Johnson", company: "StartupXYZ" },
    { quote: "Best investment we've made this year.", author: "Mike Brown", company: "Growth Inc" }
  ];

  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {properties.title || "What Our Customers Say"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="mb-4">
                <div className="text-yellow-400 mb-2">
                  {"★".repeat(5)}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                  <i className="fas fa-user text-gray-500"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatsRenderer({ properties }: { properties: Record<string, any> }) {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
    { number: "50+", label: "Countries" }
  ];

  return (
    <div className="bg-blue-600 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutRenderer({ properties }: { properties: Record<string, any> }) {
  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              {properties.title || "About Our Company"}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {properties.description || "We are a forward-thinking company dedicated to providing innovative solutions that help businesses thrive in the digital age. Our team combines expertise with passion to deliver exceptional results."}
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                <span className="text-gray-700">Innovation at our core</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                <span className="text-gray-700">Customer-focused approach</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                <span className="text-gray-700">Proven track record</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
            <i className="fas fa-building text-6xl text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
