export interface ComponentType {
  id: string;
  name: string;
  type: 'navbar' | 'hero' | 'gallery' | 'contact' | 'faq' | 'footer' | 'header';
  icon: string;
  description: string;
  defaultProps: Record<string, any>;
  propertySchema: PropertySchema[];
}

export interface PropertySchema {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'color' | 'number' | 'select' | 'image' | 'toggle';
  options?: string[];
  defaultValue?: any;
}

export interface TemplateComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  style?: Record<string, any>;
  children?: string[];
}

export interface TemplatePage {
  id: string;
  name: string;
  template: string;
  components: TemplateComponent[];
}

export interface TemplateSettings {
  name: string;
  description: string;
  author?: string;
  version: string;
  tags?: string[];
}

export interface Template {
  id?: number;
  name: string;
  description?: string;
  pages: TemplatePage[];
  settings: TemplateSettings;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DragItem {
  type: string;
  componentType: string;
  id?: string;
}

export interface DropResult {
  dropEffect: string;
  target: string;
}

export type ViewMode = 'visual' | 'code';
export type DeviceMode = 'desktop' | 'tablet' | 'mobile';
