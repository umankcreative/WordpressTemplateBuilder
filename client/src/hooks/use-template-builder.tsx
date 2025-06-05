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
    default:
      return {};
  }
}
