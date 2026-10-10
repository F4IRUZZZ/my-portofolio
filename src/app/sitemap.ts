import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/achievements",
    "/experience",
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

  return [...staticRoutes, ...projectRoutes];
}
