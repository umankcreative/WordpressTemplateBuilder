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
