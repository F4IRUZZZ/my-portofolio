CREATE TYPE "public"."publication_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."work_status" AS ENUM('In Progress', 'Completed', 'Archived');--> statement-breakpoint
CREATE TABLE "achievements" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "achievements_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"organizer" text NOT NULL,
	"category" text NOT NULL,
	"rank" text NOT NULL,
	"location" text NOT NULL,
	"competed_at" date,
	"announced_at" date,
	"description" text NOT NULL,
	"evidence_url" text,
	"publication_status" "publication_status" DEFAULT 'draft' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"image" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "experiences_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"organization" text NOT NULL,
	"role" text NOT NULL,
	"location" text,
	"start_date" date,
	"end_date" date,
	"summary" text NOT NULL,
	"responsibilities" text[] DEFAULT '{}'::text[] NOT NULL,
	"technologies" text[] DEFAULT '{}'::text[] NOT NULL,
	"related_project_slug" text,
	"publication_status" "publication_status" DEFAULT 'draft' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "profiles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"full_name" text NOT NULL,
	"headline" text NOT NULL,
	"bio" text[] DEFAULT '{}'::text[] NOT NULL,
	"education" text NOT NULL,
	"public_email" text,
	"github_url" text,
	"linkedin_url" text,
	"cv_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_media" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "project_media_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"project_id" integer NOT NULL,
	"image_url" text NOT NULL,
	"alt_text" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_technologies" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "project_technologies_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"project_id" integer NOT NULL,
	"technology_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"summary" text NOT NULL,
	"category" text NOT NULL,
	"role" text NOT NULL,
	"work_status" "work_status" NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"publication_status" "publication_status" DEFAULT 'draft' NOT NULL,
	"period" text,
	"context" text NOT NULL,
	"contributions" text[] DEFAULT '{}'::text[] NOT NULL,
	"features" text[] DEFAULT '{}'::text[] NOT NULL,
	"process" text[] DEFAULT '{}'::text[] NOT NULL,
	"challenges" text NOT NULL,
	"learnings" text NOT NULL,
	"current_state" text NOT NULL,
	"repository_url" text,
	"demo_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "project_media" ADD CONSTRAINT "project_media_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_technologies" ADD CONSTRAINT "project_technologies_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;