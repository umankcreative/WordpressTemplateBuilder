import { Component } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sliders, Trash2, Copy } from "lucide-react";

interface PropertiesPanelProps {
  selectedComponent: Component | null;
  onUpdateComponent: (id: string, properties: Record<string, any>) => void;
  onDeleteComponent: (id: string) => void;
  onCopyComponent: (id: string) => void;
}

export default function PropertiesPanel({
  selectedComponent,
  onUpdateComponent,
  onDeleteComponent,
  onCopyComponent,
}: PropertiesPanelProps) {
  if (!selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900 flex items-center">
            <Sliders className="h-4 w-4 mr-2" />
            Properties
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Sliders className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Select a component</p>
            <p className="text-slate-400 text-sm mt-1">
              Click on a component to edit its properties
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (key: string, value: any) => {
    onUpdateComponent(selectedComponent.id, {
      ...selectedComponent.properties,
      [key]: value,
    });
  };

  const renderComponentProperties = () => {
    const { type, properties } = selectedComponent;

    switch (type) {
      case "navbar":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="site-title">Site Title</Label>
              <Input
                id="site-title"
                value={properties.title || "Your Site"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="menu-items">Menu Items (comma separated)</Label>
              <Input
                id="menu-items"
                value={properties.menuItems || "Home,About,Services,Contact"}
                onChange={(e) => handlePropertyChange("menuItems", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="background-color">Background Color</Label>
              <Input
                id="background-color"
                type="color"
                value={properties.backgroundColor || "#ffffff"}
                onChange={(e) => handlePropertyChange("backgroundColor", e.target.value)}
              />
            </div>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={properties.title || "Welcome to Our Site"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Textarea
                id="hero-subtitle"
                value={properties.subtitle || "Create amazing experiences"}
                onChange={(e) => handlePropertyChange("subtitle", e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="hero-button">Button Text</Label>
              <Input
                id="hero-button"
                value={properties.buttonText || "Get Started"}
                onChange={(e) => handlePropertyChange("buttonText", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="hero-button-link">Button Link</Label>
              <Input
                id="hero-button-link"
                value={properties.buttonLink || "#"}
                onChange={(e) => handlePropertyChange("buttonLink", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="background-type">Background Type</Label>
              <Select
                value={properties.backgroundType || "gradient"}
                onValueChange={(value) => handlePropertyChange("backgroundType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gradient">Gradient</SelectItem>
                  <SelectItem value="color">Solid Color</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {properties.backgroundType !== "image" && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="start-color">Start Color</Label>
                  <Input
                    id="start-color"
                    type="color"
                    value={properties.startColor || "#2563eb"}
                    onChange={(e) => handlePropertyChange("startColor", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="end-color">End Color</Label>
                  <Input
                    id="end-color"
                    type="color"
                    value={properties.endColor || "#7c3aed"}
                    onChange={(e) => handlePropertyChange("endColor", e.target.value)}
                  />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                id="text-color"
                type="color"
                value={properties.textColor || "#ffffff"}
                onChange={(e) => handlePropertyChange("textColor", e.target.value)}
              />
            </div>
          </div>
        );

      case "gallery":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="gallery-title">Section Title</Label>
              <Input
                id="gallery-title"
                value={properties.title || "Our Gallery"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="gallery-columns">Columns</Label>
              <Select
                value={properties.columns || "3"}
                onValueChange={(value) => handlePropertyChange("columns", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Column</SelectItem>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contact-title">Section Title</Label>
              <Input
                id="contact-title"
                value={properties.title || "Contact Us"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="contact-address">Address</Label>
              <Input
                id="contact-address"
                value={properties.address || "123 Business St, City, State 12345"}
                onChange={(e) => handlePropertyChange("address", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="contact-phone">Phone</Label>
              <Input
                id="contact-phone"
                value={properties.phone || "(555) 123-4567"}
                onChange={(e) => handlePropertyChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                value={properties.email || "contact@example.com"}
                onChange={(e) => handlePropertyChange("email", e.target.value)}
              />
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="faq-title">Section Title</Label>
              <Input
                id="faq-title"
                value={properties.title || "Frequently Asked Questions"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
          </div>
        );

      case "footer":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="footer-text">Footer Text</Label>
              <Textarea
                id="footer-text"
                value={properties.text || "© 2024 Your Company. All rights reserved."}
                onChange={(e) => handlePropertyChange("text", e.target.value)}
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="footer-bg">Background Color</Label>
              <Input
                id="footer-bg"
                type="color"
                value={properties.backgroundColor || "#1f2937"}
                onChange={(e) => handlePropertyChange("backgroundColor", e.target.value)}
              />
            </div>
          </div>
        );

      case "social-proof":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="social-proof-subtitle">Subtitle</Label>
              <Input
                id="social-proof-subtitle"
                value={properties.subtitle || "Trusted by thousands of companies worldwide"}
                onChange={(e) => handlePropertyChange("subtitle", e.target.value)}
              />
            </div>
          </div>
        );

      case "cta":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cta-title">Title</Label>
              <Input
                id="cta-title"
                value={properties.title || "Ready to Get Started?"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cta-subtitle">Subtitle</Label>
              <Input
                id="cta-subtitle"
                value={properties.subtitle || "Join thousands of satisfied customers today"}
                onChange={(e) => handlePropertyChange("subtitle", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cta-primary-button">Primary Button Text</Label>
              <Input
                id="cta-primary-button"
                value={properties.primaryButton || "Get Started Free"}
                onChange={(e) => handlePropertyChange("primaryButton", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cta-secondary-button">Secondary Button Text</Label>
              <Input
                id="cta-secondary-button"
                value={properties.secondaryButton || "Learn More"}
                onChange={(e) => handlePropertyChange("secondaryButton", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cta-bg">Background Color</Label>
              <Input
                id="cta-bg"
                type="color"
                value={properties.backgroundColor || "#2563eb"}
                onChange={(e) => handlePropertyChange("backgroundColor", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cta-text-color">Text Color</Label>
              <Input
                id="cta-text-color"
                type="color"
                value={properties.textColor || "#ffffff"}
                onChange={(e) => handlePropertyChange("textColor", e.target.value)}
              />
            </div>
          </div>
        );

      case "value-proposition":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="value-title">Title</Label>
              <Input
                id="value-title"
                value={properties.title || "Why Choose Us?"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="value-subtitle">Subtitle</Label>
              <Input
                id="value-subtitle"
                value={properties.subtitle || "Discover the benefits that set us apart"}
                onChange={(e) => handlePropertyChange("subtitle", e.target.value)}
              />
            </div>
          </div>
        );

      case "client-logos":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="logos-title">Title</Label>
              <Input
                id="logos-title"
                value={properties.title || "Trusted by leading companies"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
          </div>
        );

      case "pricing":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="pricing-title">Title</Label>
              <Input
                id="pricing-title"
                value={properties.title || "Simple, Transparent Pricing"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pricing-subtitle">Subtitle</Label>
              <Input
                id="pricing-subtitle"
                value={properties.subtitle || "Choose the plan that's right for you"}
                onChange={(e) => handlePropertyChange("subtitle", e.target.value)}
              />
            </div>
          </div>
        );

      case "video":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="video-title">Title</Label>
              <Input
                id="video-title"
                value={properties.title || "Watch Our Demo"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="video-subtitle">Subtitle</Label>
              <Input
                id="video-subtitle"
                value={properties.subtitle || "See how our solution works in action"}
                onChange={(e) => handlePropertyChange("subtitle", e.target.value)}
              />
            </div>
          </div>
        );

      case "images":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="images-title">Title (Optional)</Label>
              <Input
                id="images-title"
                value={properties.title || ""}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
                placeholder="Leave empty for no title"
              />
            </div>
            <div>
              <Label htmlFor="images-count">Number of Images</Label>
              <Input
                id="images-count"
                type="number"
                min="1"
                max="12"
                value={properties.imageCount || "3"}
                onChange={(e) => handlePropertyChange("imageCount", e.target.value)}
              />
            </div>
          </div>
        );

      case "features":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="features-title">Title</Label>
              <Input
                id="features-title"
                value={properties.title || "Powerful Features"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="features-subtitle">Subtitle</Label>
              <Input
                id="features-subtitle"
                value={properties.subtitle || "Everything you need to succeed"}
                onChange={(e) => handlePropertyChange("subtitle", e.target.value)}
              />
            </div>
          </div>
        );

      case "text":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-title">Title</Label>
              <Input
                id="text-title"
                value={properties.title || "Your Content Title"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="text-content">Content</Label>
              <Textarea
                id="text-content"
                value={properties.content || "Your content goes here..."}
                onChange={(e) => handlePropertyChange("content", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        );

      case "headline":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="headline-text">Headline Text</Label>
              <Input
                id="headline-text"
                value={properties.text || "Your Amazing Headline"}
                onChange={(e) => handlePropertyChange("text", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="headline-font-size">Font Size (px)</Label>
              <Input
                id="headline-font-size"
                type="number"
                min="20"
                max="80"
                value={properties.fontSize || 48}
                onChange={(e) => handlePropertyChange("fontSize", parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="headline-color">Text Color</Label>
              <Input
                id="headline-color"
                type="color"
                value={properties.textColor || "#1f2937"}
                onChange={(e) => handlePropertyChange("textColor", e.target.value)}
              />
            </div>
          </div>
        );

      case "subheading":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="subheading-text">Subheading Text</Label>
              <Input
                id="subheading-text"
                value={properties.text || "Supporting text that provides additional context"}
                onChange={(e) => handlePropertyChange("text", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subheading-font-size">Font Size (px)</Label>
              <Input
                id="subheading-font-size"
                type="number"
                min="14"
                max="32"
                value={properties.fontSize || 20}
                onChange={(e) => handlePropertyChange("fontSize", parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="subheading-color">Text Color</Label>
              <Input
                id="subheading-color"
                type="color"
                value={properties.textColor || "#6b7280"}
                onChange={(e) => handlePropertyChange("textColor", e.target.value)}
              />
            </div>
          </div>
        );

      case "team":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="team-title">Title</Label>
              <Input
                id="team-title"
                value={properties.title || "Meet Our Team"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="team-subtitle">Subtitle</Label>
              <Input
                id="team-subtitle"
                value={properties.subtitle || "The talented people behind our success"}
                onChange={(e) => handlePropertyChange("subtitle", e.target.value)}
              />
            </div>
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="testimonials-title">Title</Label>
              <Input
                id="testimonials-title"
                value={properties.title || "What Our Customers Say"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="about-title">Title</Label>
              <Input
                id="about-title"
                value={properties.title || "About Our Company"}
                onChange={(e) => handlePropertyChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="about-description">Description</Label>
              <Textarea
                id="about-description"
                value={properties.description || "We are a forward-thinking company..."}
                onChange={(e) => handlePropertyChange("description", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        );

      case "trust-signals":
      case "stats":
        return (
          <div className="space-y-4">
            <div className="text-center text-slate-500">
              <p>This component uses predefined content.</p>
              <p>Adjust spacing settings below.</p>
            </div>
          </div>
        );

      default:
        return <p className="text-slate-500">No properties available for this component.</p>;
    }
  };

  return (
    <div className="w-80 bg-white border-l border-slate-200 flex flex-col">
      {/* Properties Header */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-900 flex items-center">
          <Sliders className="h-4 w-4 mr-2" />
          Properties
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)} Selected
        </p>
      </div>

      {/* Properties Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* General Properties */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="component-name">Component Name</Label>
              <Input
                id="component-name"
                value={selectedComponent.type}
                disabled
                className="bg-slate-50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopyComponent(selectedComponent.id)}
                className="flex-1"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteComponent(selectedComponent.id)}
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Component-specific Properties */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Content</CardTitle>
          </CardHeader>
          <CardContent>{renderComponentProperties()}</CardContent>
        </Card>

        {/* Spacing */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Spacing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="padding-top">Padding Top</Label>
                <Input
                  id="padding-top"
                  type="number"
                  value={selectedComponent.properties.paddingTop || 20}
                  onChange={(e) => handlePropertyChange("paddingTop", parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="padding-bottom">Padding Bottom</Label>
                <Input
                  id="padding-bottom"
                  type="number"
                  value={selectedComponent.properties.paddingBottom || 20}
                  onChange={(e) => handlePropertyChange("paddingBottom", parseInt(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // Duplicate component logic would go here
              console.log("Duplicate component");
            }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Duplicate Component
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => onDeleteComponent(selectedComponent.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Component
          </Button>
        </div>
      </div>
    </div>
  );
}
