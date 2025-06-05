import { templates, pages, type Template, type InsertTemplate, type Page, type InsertPage } from "@shared/schema";

export interface IStorage {
  // Template operations
  getTemplate(id: number): Promise<Template | undefined>;
  getTemplates(): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: number, template: Partial<InsertTemplate>): Promise<Template | undefined>;
  deleteTemplate(id: number): Promise<boolean>;
  
  // Page operations
  getPage(id: number): Promise<Page | undefined>;
  getTemplatePages(templateId: number): Promise<Page[]>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: number, page: Partial<InsertPage>): Promise<Page | undefined>;
  deletePage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private templates: Map<number, Template>;
  private pages: Map<number, Page>;
  private currentTemplateId: number;
  private currentPageId: number;

  constructor() {
    this.templates = new Map();
    this.pages = new Map();
    this.currentTemplateId = 1;
    this.currentPageId = 1;
  }

  // Template operations
  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async getTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = this.currentTemplateId++;
    const template: Template = {
      ...insertTemplate,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.templates.set(id, template);
    return template;
  }

  async updateTemplate(id: number, updates: Partial<InsertTemplate>): Promise<Template | undefined> {
    const template = this.templates.get(id);
    if (!template) return undefined;

    const updatedTemplate = {
      ...template,
      ...updates,
      updatedAt: new Date(),
    };
    this.templates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  async deleteTemplate(id: number): Promise<boolean> {
    const deleted = this.templates.delete(id);
    if (deleted) {
      // Also delete associated pages
      for (const [pageId, page] of this.pages.entries()) {
        if (page.templateId === id) {
          this.pages.delete(pageId);
        }
      }
    }
    return deleted;
  }

  // Page operations
  async getPage(id: number): Promise<Page | undefined> {
    return this.pages.get(id);
  }

  async getTemplatePages(templateId: number): Promise<Page[]> {
    return Array.from(this.pages.values()).filter(page => page.templateId === templateId);
  }

  async createPage(insertPage: InsertPage): Promise<Page> {
    const id = this.currentPageId++;
    const page: Page = {
      ...insertPage,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.pages.set(id, page);
    return page;
  }

  async updatePage(id: number, updates: Partial<InsertPage>): Promise<Page | undefined> {
    const page = this.pages.get(id);
    if (!page) return undefined;

    const updatedPage = {
      ...page,
      ...updates,
      updatedAt: new Date(),
    };
    this.pages.set(id, updatedPage);
    return updatedPage;
  }

  async deletePage(id: number): Promise<boolean> {
    return this.pages.delete(id);
  }
}

export const storage = new MemStorage();
