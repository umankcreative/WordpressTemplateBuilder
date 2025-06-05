import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  author: text("author"),
  version: text("version").default("1.0.0"),
  pages: jsonb("pages").notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  templateId: integer("template_id").references(() => templates.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  components: jsonb("components").notNull().default([]),
  isHomePage: boolean("is_home_page").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Component schema for JSON storage
export const componentSchema = z.object({
  id: z.string(),
  type: z.enum([
    "navbar", "hero", "gallery", "faq", "contact", "footer", "header",
    "social-proof", "cta", "value-proposition", "client-logos", "pricing",
    "trust-signals", "video", "images", "logos", "features", "text",
    "headline", "subheading", "team", "testimonials", "stats", "about"
  ]),
  properties: z.record(z.any()),
  children: z.array(z.any()).optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }).optional(),
});

export const insertTemplateSchema = createInsertSchema(templates).pick({
  name: true,
  description: true,
  author: true,
  version: true,
  pages: true,
});

export const insertPageSchema = createInsertSchema(pages).pick({
  templateId: true,
  name: true,
  slug: true,
  components: true,
  isHomePage: true,
});

export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
export type Component = z.infer<typeof componentSchema>;
