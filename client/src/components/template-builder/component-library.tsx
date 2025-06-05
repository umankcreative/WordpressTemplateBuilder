import { useDrag } from "react-dnd";
import { 
  Navigation, Star, Images, HelpCircle, Mail, Minus, 
  Award, MousePointer, Target, Users, DollarSign, Shield,
  Play, Camera, Building2, FileText, Type, Heading,
  UserCheck, MessageSquare, BarChart3, Info
} from "lucide-react";

interface ComponentLibraryProps {
  searchTerm: string;
  onAddComponent: (type: string) => void;
}

interface ComponentItemProps {
  type: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  onAddComponent: (type: string) => void;
}

function ComponentItem({ type, name, description, icon, onAddComponent }: ComponentItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 border border-slate-200 rounded-lg cursor-move hover:border-blue-300 hover:bg-blue-50 transition-all group ${
        isDragging ? "opacity-50" : ""
      }`}
      onClick={() => onAddComponent(type)}
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm text-slate-900">{name}</div>
          <div className="text-xs text-slate-500">{description}</div>
        </div>
        <div className="text-slate-400 group-hover:text-blue-500">
          <i className="fas fa-grip-dots-vertical text-sm"></i>
        </div>
      </div>
    </div>
  );
}

export default function ComponentLibrary({ searchTerm, onAddComponent }: ComponentLibraryProps) {
  const components = [
    // Layout Components
    {
      type: "navbar",
      name: "Navigation Bar",
      description: "Header navigation menu",
      icon: <Navigation className="h-4 w-4 text-slate-600" />,
      category: "Layout",
    },
    {
      type: "footer",
      name: "Footer",
      description: "Bottom page section",
      icon: <Minus className="h-4 w-4 text-slate-600" />,
      category: "Layout",
    },
    
    // Hero & Headers
    {
      type: "hero",
      name: "Hero Section",
      description: "Main banner area",
      icon: <Star className="h-4 w-4 text-slate-600" />,
      category: "Hero & Headers",
    },
    {
      type: "headline",
      name: "Headline",
      description: "Large attention-grabbing title",
      icon: <Heading className="h-4 w-4 text-slate-600" />,
      category: "Hero & Headers",
    },
    {
      type: "subheading",
      name: "Subheading",
      description: "Supporting text under headlines",
      icon: <Type className="h-4 w-4 text-slate-600" />,
      category: "Hero & Headers",
    },
    
    // Content Components
    {
      type: "text",
      name: "Text Block",
      description: "Rich text content",
      icon: <FileText className="h-4 w-4 text-slate-600" />,
      category: "Content",
    },
    {
      type: "features",
      name: "Features",
      description: "Product/service features grid",
      icon: <Target className="h-4 w-4 text-slate-600" />,
      category: "Content",
    },
    {
      type: "about",
      name: "About Section",
      description: "Company information",
      icon: <Info className="h-4 w-4 text-slate-600" />,
      category: "Content",
    },
    {
      type: "faq",
      name: "FAQ Section",
      description: "Frequently asked questions",
      icon: <HelpCircle className="h-4 w-4 text-slate-600" />,
      category: "Content",
    },
    
    // Visual Components
    {
      type: "gallery",
      name: "Gallery",
      description: "Image showcase grid",
      icon: <Images className="h-4 w-4 text-slate-600" />,
      category: "Visual",
    },
    {
      type: "video",
      name: "Video Player",
      description: "Embedded video content",
      icon: <Play className="h-4 w-4 text-slate-600" />,
      category: "Visual",
    },
    {
      type: "images",
      name: "Image Block",
      description: "Single or multiple images",
      icon: <Camera className="h-4 w-4 text-slate-600" />,
      category: "Visual",
    },
    
    // Social Proof
    {
      type: "testimonials",
      name: "Testimonials",
      description: "Customer reviews and quotes",
      icon: <MessageSquare className="h-4 w-4 text-slate-600" />,
      category: "Social Proof",
    },
    {
      type: "social-proof",
      name: "Social Proof",
      description: "Customer logos and metrics",
      icon: <Award className="h-4 w-4 text-slate-600" />,
      category: "Social Proof",
    },
    {
      type: "client-logos",
      name: "Client Logos",
      description: "Company logos showcase",
      icon: <Building2 className="h-4 w-4 text-slate-600" />,
      category: "Social Proof",
    },
    {
      type: "stats",
      name: "Statistics",
      description: "Key numbers and metrics",
      icon: <BarChart3 className="h-4 w-4 text-slate-600" />,
      category: "Social Proof",
    },
    
    // Business Components
    {
      type: "pricing",
      name: "Pricing Tables",
      description: "Service pricing plans",
      icon: <DollarSign className="h-4 w-4 text-slate-600" />,
      category: "Business",
    },
    {
      type: "cta",
      name: "Call to Action",
      description: "Action buttons and forms",
      icon: <MousePointer className="h-4 w-4 text-slate-600" />,
      category: "Business",
    },
    {
      type: "contact",
      name: "Contact Form",
      description: "Contact information and forms",
      icon: <Mail className="h-4 w-4 text-slate-600" />,
      category: "Business",
    },
    {
      type: "value-proposition",
      name: "Value Proposition",
      description: "Key benefits highlight",
      icon: <Target className="h-4 w-4 text-slate-600" />,
      category: "Business",
    },
    
    // Trust & Team
    {
      type: "trust-signals",
      name: "Trust Signals",
      description: "Security badges and certifications",
      icon: <Shield className="h-4 w-4 text-slate-600" />,
      category: "Trust & Team",
    },
    {
      type: "team",
      name: "Team Section",
      description: "Team member profiles",
      icon: <Users className="h-4 w-4 text-slate-600" />,
      category: "Trust & Team",
    },
  ];

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedComponents = filteredComponents.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, typeof components>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
        <div key={category}>
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center">
            <i className={`fas ${category === "Layout" ? "fa-th-large" : "fa-puzzle-piece"} mr-2 text-slate-500`}></i>
            {category}
          </h3>
          <div className="space-y-2">
            {categoryComponents.map((component) => (
              <ComponentItem
                key={component.type}
                {...component}
                onAddComponent={onAddComponent}
              />
            ))}
          </div>
        </div>
      ))}

      {filteredComponents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500">No components found</p>
          <p className="text-slate-400 text-sm mt-1">Try adjusting your search term</p>
        </div>
      )}
    </div>
  );
}
