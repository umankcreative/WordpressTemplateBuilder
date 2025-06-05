import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Copy, Trash2 } from 'lucide-react';
import type { TemplateComponent as TemplateComponentType } from '@/types/template';

interface TemplateComponentProps {
  component: TemplateComponentType;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<TemplateComponentType>) => void;
  onDelete: () => void;
  index: number;
}

export function TemplateComponent({
  component,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  index
}: TemplateComponentProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this component?')) {
      onDelete();
    }
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'navbar':
        return <NavbarComponent component={component} />;
      case 'hero':
        return <HeroComponent component={component} />;
      case 'gallery':
        return <GalleryComponent component={component} />;
      case 'contact':
        return <ContactComponent component={component} />;
      case 'faq':
        return <FaqComponent component={component} />;
      case 'footer':
        return <FooterComponent component={component} />;
      default:
        return <DefaultComponent component={component} />;
    }
  };

  return (
    <div
      className={`relative group transition-all ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Component Controls */}
      {(isHovered || isSelected) && (
        <div className="absolute -top-8 left-0 z-10 flex items-center space-x-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
          <Badge variant="secondary" className="text-xs">
            {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
          </Badge>
          <Button
            size="sm"
            variant="ghost"
            className="h-5 w-5 p-0 hover:bg-white/20"
            onClick={handleEdit}
          >
            <Settings className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-5 w-5 p-0 hover:bg-white/20"
            onClick={handleDelete}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Component Content */}
      {renderComponent()}
    </div>
  );
}

// Individual component renderers
function NavbarComponent({ component }: { component: TemplateComponentType }) {
  const { siteName = 'Your Site', menuItems = ['Home', 'About', 'Services', 'Contact'] } = component.props;

  return (
    <nav className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="font-bold text-xl text-foreground">{siteName}</div>
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item: string, index: number) => (
            <a key={index} href="#" className="text-foreground hover:text-primary">
              {item}
            </a>
          ))}
        </div>
        <button className="md:hidden">
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-foreground"></div>
            <div className="w-6 h-0.5 bg-foreground"></div>
            <div className="w-6 h-0.5 bg-foreground"></div>
          </div>
        </button>
      </div>
    </nav>
  );
}

function HeroComponent({ component }: { component: TemplateComponentType }) {
  const {
    title = 'Welcome to Our Site',
    subtitle = 'Create amazing experiences with our platform',
    buttonText = 'Get Started',
    background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor = '#ffffff'
  } = component.props;

  return (
    <div
      className="relative py-24 px-6"
      style={{
        background,
        color: textColor
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">{title}</h1>
        <p className="text-xl mb-8 opacity-90">{subtitle}</p>
        {buttonText && (
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}

function GalleryComponent({ component }: { component: TemplateComponentType }) {
  const { title = 'Our Gallery', columns = 3 } = component.props;

  return (
    <div className="py-16 px-6 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">{title}</h2>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className="bg-muted-foreground/20 aspect-square rounded-lg flex items-center justify-center"
            >
              <div className="text-muted-foreground text-4xl">🖼️</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactComponent({ component }: { component: TemplateComponentType }) {
  const {
    title = 'Contact Us',
    address = '123 Business St, City, State 12345',
    phone = '(555) 123-4567',
    email = 'contact@example.com'
  } = component.props;

  return (
    <div className="py-16 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">{title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground"
            />
            <Button className="w-full">
              Send Message
            </Button>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                📍
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Address</h4>
                <p className="text-muted-foreground">{address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                📞
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Phone</h4>
                <p className="text-muted-foreground">{phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                ✉️
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Email</h4>
                <p className="text-muted-foreground">{email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqComponent({ component }: { component: TemplateComponentType }) {
  const { title = 'Frequently Asked Questions', items = [] } = component.props;

  return (
    <div className="py-16 px-6 bg-muted">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">{title}</h2>
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">How do I get started?</h3>
                <span className="text-muted-foreground">▼</span>
              </div>
              <p className="mt-4 text-muted-foreground">
                Simply sign up for an account and follow our easy setup wizard.
              </p>
            </div>
          ) : (
            items.map((item: any, index: number) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{item.question}</h3>
                  <span className="text-muted-foreground">▼</span>
                </div>
                {item.answer && (
                  <p className="mt-4 text-muted-foreground">{item.answer}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function FooterComponent({ component }: { component: TemplateComponentType }) {
  const {
    copyright = `© ${new Date().getFullYear()} Your Site. All rights reserved.`,
    address = '123 Business St, City, State 12345',
    phone = '(555) 123-4567',
    email = 'contact@example.com'
  } = component.props;

  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Your Site</h3>
            <p className="text-slate-400">Building amazing experiences for our users worldwide.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-slate-400 text-sm">
              <p>{address}</p>
              <p>{phone}</p>
              <p>{email}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}

function DefaultComponent({ component }: { component: TemplateComponentType }) {
  return (
    <div className="border-2 border-dashed border-muted p-8 text-center">
      <h3 className="text-lg font-medium text-foreground mb-2">
        {component.type.charAt(0).toUpperCase() + component.type.slice(1)} Component
      </h3>
      <p className="text-muted-foreground">Configure this component in the properties panel</p>
    </div>
  );
}
