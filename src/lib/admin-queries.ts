/*
 * Query KHUSUS admin: boleh membaca draft. Setiap fungsi assert sesi dulu.
 * Halaman publik memakai src/lib/queries.ts (published only).
 */
import { asc, desc, eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "./auth";
import { getDb } from "@/db";
import {
  achievements,
  articles,
  experiences,
  profiles,
  projectTechnologies,
  projects,
} from "@/db/schema";

export async function requireAdmin() {
  const session = await getServerSession(getAuthOptions());
  if (!session?.user?.email) {
    throw new Error("Butuh sesi admin.");
  }
  return session;
}

export type AdminCounts = {
  projectsPublished: number;
  projectsDraft: number;
  achievementsPublished: number;
  achievementsDraft: number;
  experiencesCount: number;
  articlesPublished: number;
  articlesDraft: number;
};

export async function getAdminCounts(): Promise<AdminCounts> {
  await requireAdmin();
  const db = getDb();
  const [p, a, e, ar] = await Promise.all([
    db
      .select({
        status: projects.publicationStatus,
        count: sql<number>`count(*)::int`,
      })
      .from(projects)
      .groupBy(projects.publicationStatus),
    db
      .select({
        status: achievements.publicationStatus,
        count: sql<number>`count(*)::int`,
      })
      .from(achievements)
      .groupBy(achievements.publicationStatus),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(experiences),
    db
      .select({
        status: articles.publicationStatus,
        count: sql<number>`count(*)::int`,
      })
      .from(articles)
      .groupBy(articles.publicationStatus),
  ]);
  const find = (rows: { status: string; count: number }[], status: string) =>
    rows.find((row) => row.status === status)?.count ?? 0;
  return {
    projectsPublished: find(p, "published"),
    projectsDraft: find(p, "draft"),
    achievementsPublished: find(a, "published"),
    achievementsDraft: find(a, "draft"),
    experiencesCount: e[0]?.count ?? 0,
    articlesPublished: find(ar, "published"),
    articlesDraft: find(ar, "draft"),
  };
}

export type AdminProjectRow = {
  id: number;
  title: string;
  slug: string;
  publicationStatus: "draft" | "published";
  workStatus: string;
  updatedAt: Date;
};

export async function getAdminProjects(): Promise<AdminProjectRow[]> {
  await requireAdmin();
  const db = getDb();
  return db
    .select({
      id: projects.id,
      title: projects.title,
      slug: projects.slug,
      publicationStatus: projects.publicationStatus,
      workStatus: projects.workStatus,
      updatedAt: projects.updatedAt,
    })
    .from(projects)
    .orderBy(desc(projects.updatedAt));
}

export type AdminProjectDetail = typeof projects.$inferSelect & {
  technologies: string[];
};

export async function getAdminProject(
  id: number,
): Promise<AdminProjectDetail | null> {
  await requireAdmin();
  const db = getDb();
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  const techs = await db
    .select({ name: projectTechnologies.technologyName })
    .from(projectTechnologies)
    .where(eq(projectTechnologies.projectId, row.id));
  return { ...row, technologies: techs.map((t) => t.name) };
}

export type AdminAchievementRow = typeof achievements.$inferSelect;

export async function getAdminAchievements(): Promise<AdminAchievementRow[]> {
  await requireAdmin();
  const db = getDb();
  return db
    .select()
    .from(achievements)
    .orderBy(asc(achievements.sortOrder), desc(achievements.updatedAt));
}

export async function getAdminAchievement(
  id: number,
): Promise<AdminAchievementRow | null> {
  await requireAdmin();
  const db = getDb();
  const rows = await db
    .select()
    .from(achievements)
    .where(eq(achievements.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export type AdminExperienceRow = typeof experiences.$inferSelect;

export async function getAdminExperiences(): Promise<AdminExperienceRow[]> {
  await requireAdmin();
  const db = getDb();
  return db
    .select()
    .from(experiences)
    .orderBy(asc(experiences.sortOrder), desc(experiences.updatedAt));
}

export async function getAdminExperience(
  id: number,
): Promise<AdminExperienceRow | null> {
  await requireAdmin();
  const db = getDb();
  const rows = await db
    .select()
    .from(experiences)
    .where(eq(experiences.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export type AdminProfile = typeof profiles.$inferSelect | null;

export async function getAdminProfile(): Promise<AdminProfile> {
  await requireAdmin();
  const db = getDb();
  const rows = await db.select().from(profiles).limit(1);
  return rows[0] ?? null;
}

export async function getRecentActivity(): Promise<
  { type: string; title: string; status: string; updatedAt: Date }[]
> {
  await requireAdmin();
  const db = getDb();
  const [pp, aa] = await Promise.all([
    db
      .select({
        title: projects.title,
        status: projects.publicationStatus,
        updatedAt: projects.updatedAt,
      })
      .from(projects)
      .orderBy(desc(projects.updatedAt))
      .limit(5),
    db
      .select({
        title: achievements.title,
        status: achievements.publicationStatus,
        updatedAt: achievements.updatedAt,
      })
      .from(achievements)
      .orderBy(desc(achievements.updatedAt))
      .limit(5),
  ]);
  return [
    ...pp.map((row) => ({ ...row, type: "Proyek" })),
    ...aa.map((row) => ({ ...row, type: "Prestasi" })),
  ]
    .sort((x, y) => y.updatedAt.getTime() - x.updatedAt.getTime())
    .slice(0, 5);
}

export type AdminArticleRow = typeof articles.$inferSelect;

export async function getAdminArticles(): Promise<AdminArticleRow[]> {
  await requireAdmin();
  const db = getDb();
  return db
    .select()
    .from(articles)
    .orderBy(asc(articles.sortOrder), desc(articles.updatedAt));
}

export async function getAdminArticle(
  id: number,
): Promise<AdminArticleRow | null> {
  await requireAdmin();
  const db = getDb();
  const rows = await db
    .select()
    .from(articles)
    .where(eq(articles.id, id))
    .limit(1);
  return rows[0] ?? null;
}
