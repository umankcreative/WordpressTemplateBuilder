import { useState, useCallback } from "react";
import { Component } from "@shared/schema";

export function useTemplateBuilder() {
  const [currentView, setCurrentView] = useState<"visual" | "code">("visual");
  const [currentBreakpoint, setCurrentBreakpoint] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const addComponent = useCallback((type: string) => {
    const newComponent: Component = {
      id: `${type}-${Date.now()}`,
      type: type as any,
      properties: getDefaultProperties(type),
    };

    setComponents((prev) => [...prev, newComponent]);
  }, []);

  const updateComponent = useCallback((id: string, properties: Record<string, any>) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id
          ? { ...component, properties }
          : component
      )
    );
  }, []);

  const deleteComponent = useCallback((id: string) => {
    setComponents((prev) => prev.filter((component) => component.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  }, [selectedComponent]);

  const selectComponent = useCallback((id: string) => {
    setSelectedComponent(id);
  }, []);

  const copyComponent = useCallback((id: string) => {
    const componentToCopy = components.find((component) => component.id === id);
    if (componentToCopy) {
      const newComponent = {
        ...componentToCopy,
        id: `${componentToCopy.type}_${Date.now()}`,
      };
      setComponents((prev) => [...prev, newComponent]);
    }
  }, [components]);

  const clearSelection = useCallback(() => {
    setSelectedComponent(null);
  }, []);

  const getSelectedComponentData = useCallback(() => {
    if (!selectedComponent) return null;
    return components.find((component) => component.id === selectedComponent) || null;
  }, [selectedComponent, components]);

  return {
    currentView,
    setCurrentView,
    currentBreakpoint,
    setCurrentBreakpoint,
    components,
    selectedComponent: getSelectedComponentData(),
    addComponent,
    updateComponent,
    deleteComponent,
    copyComponent,
    selectComponent,
    clearSelection,
  };
}

function getDefaultProperties(type: string): Record<string, any> {
  switch (type) {
    case "navbar":
      return {
        title: "Your Site",
        menuItems: "Home,About,Services,Contact",
        backgroundColor: "#ffffff",
        textColor: "#333333",
      };
    case "hero":
      return {
        title: "Welcome to Our Site",
        subtitle: "Create amazing experiences with our platform",
        buttonText: "Get Started",
        buttonLink: "#",
        backgroundType: "gradient",
        startColor: "#2563eb",
        endColor: "#7c3aed",
        textColor: "#ffffff",
        paddingTop: 80,
        paddingBottom: 80,
      };
    case "gallery":
      return {
        title: "Our Gallery",
        columns: "3",
        paddingTop: 60,
        paddingBottom: 60,
      };
    case "contact":
      return {
        title: "Contact Us",
        address: "123 Business St, City, State 12345",
        phone: "(555) 123-4567",
        email: "contact@example.com",
        paddingTop: 60,
        paddingBottom: 60,
      };
    case "faq":
      return {
        title: "Frequently Asked Questions",
        paddingTop: 60,
        paddingBottom: 60,
      };
    case "footer":
      return {
        text: "© 2024 Your Company. All rights reserved.",
        backgroundColor: "#1f2937",
        textColor: "#ffffff",
        paddingTop: 40,
        paddingBottom: 40,
      };
    case "social-proof":
      return {
        subtitle: "Trusted by thousands of companies worldwide",
        paddingTop: 60,
        paddingBottom: 60,
      };
    case "cta":
      return {
        title: "Ready to Get Started?",
        subtitle: "Join thousands of satisfied customers today",
        primaryButton: "Get Started Free",
        secondaryButton: "Learn More",
        backgroundColor: "#2563eb",
        textColor: "#ffffff",
        paddingTop: 80,
        paddingBottom: 80,
      };
    case "value-proposition":
      return {
        title: "Why Choose Us?",
        subtitle: "Discover the benefits that set us apart",
        paddingTop: 80,
        paddingBottom: 80,
      };
    case "client-logos":
      return {
        title: "Trusted by leading companies",
        paddingTop: 60,
        paddingBottom: 60,
      };
    case "pricing":
      return {
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the plan that's right for you",
        paddingTop: 80,
        paddingBottom: 80,
      };
    case "trust-signals":
      return {
        paddingTop: 60,
        paddingBottom: 60,
      };
    case "video":
      return {
        title: "Watch Our Demo",
        subtitle: "See how our solution works in action",
        paddingTop: 80,
        paddingBottom: 80,
      };
    case "images":
      return {
        title: "",
        imageCount: "3",
        paddingTop: 60,
        paddingBottom: 60,
      };
    case "features":
      return {
        title: "Powerful Features",
        subtitle: "Everything you need to succeed",
        paddingTop: 80,
        paddingBottom: 80,
      };
    case "text":
      return {
        title: "Your Content Title",
        content: "Your content goes here. This is a flexible text block that can contain any type of content you want to display on your website.",
        paddingTop: 60,
        paddingBottom: 60,
      };
    case "headline":
      return {
        text: "Your Amazing Headline",
        fontSize: 48,
        textColor: "#1f2937",
        paddingTop: 40,
        paddingBottom: 40,
      };
    case "subheading":
      return {
        text: "Supporting text that provides additional context",
        fontSize: 20,
        textColor: "#6b7280",
        paddingTop: 20,
        paddingBottom: 20,
      };
    case "team":
      return {
        title: "Meet Our Team",
        subtitle: "The talented people behind our success",
        paddingTop: 80,
        paddingBottom: 80,
      };
    case "testimonials":
      return {
        title: "What Our Customers Say",
        paddingTop: 80,
        paddingBottom: 80,
      };
    case "stats":
      return {
        paddingTop: 80,
        paddingBottom: 80,
      };
    case "about":
      return {
        title: "About Our Company",
        description: "We are a forward-thinking company dedicated to providing innovative solutions.",
        paddingTop: 80,
        paddingBottom: 80,
      };
    default:
      return {};
  }
}
