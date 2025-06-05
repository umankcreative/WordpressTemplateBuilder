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
}

export default function PropertiesPanel({
  selectedComponent,
  onUpdateComponent,
  onDeleteComponent,
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
