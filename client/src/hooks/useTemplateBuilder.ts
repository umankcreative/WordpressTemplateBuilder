import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Template, TemplateComponent, TemplatePage, ViewMode, DeviceMode } from '@/types/template';

export function useTemplateBuilder() {
  const [currentTemplate, setCurrentTemplate] = useState<Template>({
    name: 'New Template',
    pages: [{
      id: 'home',
      name: 'Home',
      template: 'index',
      components: []
    }],
    settings: {
      name: 'New Template',
      description: '',
      version: '1.0.0'
    }
  });

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('visual');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [currentPageId, setCurrentPageId] = useState<string>('home');

  const queryClient = useQueryClient();

  // Get current page
  const currentPage = currentTemplate.pages.find(p => p.id === currentPageId) || currentTemplate.pages[0];

  // Save template mutation
  const saveTemplateMutation = useMutation({
    mutationFn: async (template: Template) => {
      const url = template.id ? `/api/templates/${template.id}` : '/api/templates';
      const method = template.id ? 'PUT' : 'POST';
      const response = await apiRequest(method, url, template);
      return response.json();
    },
    onSuccess: (savedTemplate) => {
      setCurrentTemplate(savedTemplate);
      queryClient.invalidateQueries({ queryKey: ['/api/templates'] });
    }
  });

  // Export template mutation
  const exportTemplateMutation = useMutation({
    mutationFn: async (templateId: number) => {
      const response = await apiRequest('POST', `/api/templates/${templateId}/export`);
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${currentTemplate.settings.name.replace(/[^a-zA-Z0-9]/g, '-')}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  });

  // Add component to current page
  const addComponent = useCallback((componentType: string, props: Record<string, any> = {}) => {
    const newComponent: TemplateComponent = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      props: { ...getDefaultProps(componentType), ...props }
    };

    setCurrentTemplate(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === currentPageId
          ? { ...page, components: [...page.components, newComponent] }
          : page
      )
    }));

    setSelectedComponent(newComponent.id);
  }, [currentPageId]);

  // Update component
  const updateComponent = useCallback((componentId: string, updates: Partial<TemplateComponent>) => {
    setCurrentTemplate(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === currentPageId
          ? {
              ...page,
              components: page.components.map(comp =>
                comp.id === componentId ? { ...comp, ...updates } : comp
              )
            }
          : page
      )
    }));
  }, [currentPageId]);

  // Delete component
  const deleteComponent = useCallback((componentId: string) => {
    setCurrentTemplate(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === currentPageId
          ? {
              ...page,
              components: page.components.filter(comp => comp.id !== componentId)
            }
          : page
      )
    }));

    if (selectedComponent === componentId) {
      setSelectedComponent(null);
    }
  }, [currentPageId, selectedComponent]);

  // Move component
  const moveComponent = useCallback((dragIndex: number, hoverIndex: number) => {
    setCurrentTemplate(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === currentPageId
          ? {
              ...page,
              components: moveArrayElement(page.components, dragIndex, hoverIndex)
            }
          : page
      )
    }));
  }, [currentPageId]);

  // Add page
  const addPage = useCallback((name: string, template: string = 'page') => {
    const newPage: TemplatePage = {
      id: `page-${Date.now()}`,
      name,
      template,
      components: []
    };

    setCurrentTemplate(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));

    setCurrentPageId(newPage.id);
  }, []);

  // Delete page
  const deletePage = useCallback((pageId: string) => {
    setCurrentTemplate(prev => ({
      ...prev,
      pages: prev.pages.filter(p => p.id !== pageId)
    }));

    if (currentPageId === pageId) {
      setCurrentPageId(currentTemplate.pages[0]?.id || 'home');
    }
  }, [currentPageId, currentTemplate.pages]);

  return {
    // State
    currentTemplate,
    currentPage,
    selectedComponent,
    viewMode,
    deviceMode,
    currentPageId,

    // Actions
    setCurrentTemplate,
    setSelectedComponent,
    setViewMode,
    setDeviceMode,
    setCurrentPageId,

    // Component operations
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,

    // Page operations
    addPage,
    deletePage,

    // Mutations
    saveTemplate: saveTemplateMutation.mutateAsync,
    exportTemplate: exportTemplateMutation.mutateAsync,
    isSaving: saveTemplateMutation.isPending,
    isExporting: exportTemplateMutation.isPending,
  };
}

// Helper functions
function getDefaultProps(componentType: string): Record<string, any> {
  switch (componentType) {
    case 'navbar':
      return {
        siteName: 'Your Site',
        menuItems: ['Home', 'About', 'Services', 'Contact']
      };
    case 'hero':
      return {
        title: 'Welcome to Our Site',
        subtitle: 'Create amazing experiences with our platform',
        buttonText: 'Get Started',
        buttonLink: '#',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#ffffff'
      };
    case 'gallery':
      return {
        title: 'Our Gallery',
        columns: 3,
        images: []
      };
    case 'contact':
      return {
        title: 'Contact Us',
        address: '123 Business St, City, State 12345',
        phone: '(555) 123-4567',
        email: 'contact@example.com'
      };
    case 'faq':
      return {
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'How do I get started?',
            answer: 'Simply sign up for an account and follow our easy setup wizard.'
          }
        ]
      };
    case 'footer':
      return {
        copyright: `© ${new Date().getFullYear()} Your Site. All rights reserved.`,
        address: '123 Business St, City, State 12345',
        phone: '(555) 123-4567',
        email: 'contact@example.com'
      };
    default:
      return {};
  }
}

function moveArrayElement<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...array];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}
