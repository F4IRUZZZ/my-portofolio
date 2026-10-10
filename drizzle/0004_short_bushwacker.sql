ALTER TABLE "articles" ADD COLUMN "preview_token" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "preview_token" text;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_preview_token_unique" UNIQUE("preview_token");--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_preview_token_unique" UNIQUE("preview_token");