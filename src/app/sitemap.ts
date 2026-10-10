import type { MetadataRoute } from "next";
import { getPublishedArticles, getPublishedProjects } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/achievements",
    "/experience",
    "/articles",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: `${siteUrl}${path === "" ? "" : path}`,
    lastModified: new Date(),
  }));

  const projects = await getPublishedProjects();
  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const articles = await getPublishedArticles();
  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
