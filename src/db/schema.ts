import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/*
 * Skema awal Fairuz.dev (PRD §10). publication_status dipisahkan dari
 * work_status: proyek In Progress tetap bisa published dengan
 * keterangan jujur. Jangan mengisi tanggal/metrik yang belum dikonfirmasi.
 */

export const workStatusEnum = pgEnum("work_status", [
  "In Progress",
  "Completed",
  "Archived",
]);

export const publicationStatusEnum = pgEnum("publication_status", [
  "draft",
  "published",
]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
};

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  image: text("image"),
  ...timestamps,
});

export const profiles = pgTable("profiles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  fullName: text("full_name").notNull(),
  headline: text("headline").notNull(),
  bio: text("bio").array().notNull().default(sql`'{}'::text[]`),
  education: text("education").notNull(),
  publicEmail: text("public_email"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  cvUrl: text("cv_url"),
  profileImageUrl: text("profile_image_url"),
  ...timestamps,
});

export const projects = pgTable("projects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  category: text("category").notNull(),
  role: text("role").notNull(),
  workStatus: workStatusEnum("work_status").notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
  publicationStatus: publicationStatusEnum("publication_status")
    .notNull()
    .default("draft"),
  period: text("period"),
  context: text("context").notNull(),
  contributions: text("contributions")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  features: text("features").array().notNull().default(sql`'{}'::text[]`),
  process: text("process").array().notNull().default(sql`'{}'::text[]`),
  challenges: text("challenges").notNull(),
  learnings: text("learnings").notNull(),
  currentState: text("current_state").notNull(),
  repositoryUrl: text("repository_url"),
  demoUrl: text("demo_url"),
  coverImageUrl: text("cover_image_url"),
  previewToken: text("preview_token").unique(),
  sortOrder: integer("sort_order").notNull().default(0),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  ...timestamps,
});

export const projectTechnologies = pgTable("project_technologies", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  technologyName: text("technology_name").notNull(),
});

export const projectMedia = pgTable("project_media", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const achievements = pgTable("achievements", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  organizer: text("organizer").notNull(),
  category: text("category").notNull(),
  rank: text("rank").notNull(),
  location: text("location").notNull(),
  competedAt: date("competed_at"),
  announcedAt: date("announced_at"),
  description: text("description").notNull(),
  evidenceUrl: text("evidence_url"),
  publicationStatus: publicationStatusEnum("publication_status")
    .notNull()
    .default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const experiences = pgTable("experiences", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  organization: text("organization").notNull(),
  role: text("role").notNull(),
  location: text("location"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  summary: text("summary").notNull(),
  responsibilities: text("responsibilities")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  technologies: text("technologies")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  relatedProjectSlug: text("related_project_slug"),
  evidenceUrl: text("evidence_url"),
  publicationStatus: publicationStatusEnum("publication_status")
    .notNull()
    .default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const articles = pgTable("articles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImageUrl: text("cover_image_url"),
  previewToken: text("preview_token").unique(),
  publicationStatus: publicationStatusEnum("publication_status")
    .notNull()
    .default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  ...timestamps,
});
