/*
 * Akses data publik: HANYA baris published yang bisa dibaca dari sini.
 * Draft tidak memiliki jalur ke halaman publik. CMS (Fase 4) memakai
 * query terpisah dengan proteksi sesi.
 */
import { and, asc, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { getDb } from "@/db";
import {
  achievements,
  articles,
  experiences,
  profiles,
  projectTechnologies,
  projects,
} from "@/db/schema";
import type { WorkStatus } from "@/components/ui/StatusBadge";

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function formatDateId(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS_ID[month - 1]} ${year}`;
}

function formatRangeId(startIso: string, endIso: string): string {
  const [sy, sm, sd] = startIso.split("-").map(Number);
  const [ey, em, ed] = endIso.split("-").map(Number);
  const sameMonthYear = sy === ey && sm === em;
  const startPart = sameMonthYear
    ? `${sd}`
    : `${sd} ${MONTHS_ID[sm - 1]}${sy === ey ? "" : ` ${sy}`}`;
  return `${startPart} – ${ed} ${MONTHS_ID[em - 1]} ${ey}`;
}

/* Statis interim: belum ada tabelnya di P0, isi dari data terverifikasi. */
export const techStacks = {
  used: [
    "PHP",
    "CSS",
    "JavaScript dasar",
    "Python",
    "CustomTkinter",
    "Figma",
    "draw.io",
    "Canva",
    "MySQL",
  ],
  developing: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
};

export const interests = [
  "Pengembangan web",
  "Aplikasi desktop",
  "UI/UX dan desain konten",
  "Eksplorasi teknologi (AI, IoT)",
];

export type Profile = {
  fullName: string;
  headline: string;
  tagline: string;
  subTagline: string;
  education: string;
  bio: string[];
  publicEmail: string;
  githubUrl: string;
  linkedinUrl: string;
};

export async function getProfile(): Promise<Profile> {
  "use cache";
  cacheLife("hours");
  cacheTag("profile");
  const db = getDb();
  const rows = await db.select().from(profiles).limit(1);
  const row = rows[0];
  if (!row) throw new Error("Profil belum di-seed. Jalankan npm run db:seed.");
  return {
    fullName: row.fullName,
    headline: row.headline,
    tagline:
      "Saya Fairuz, Student Developer yang membangun solusi digital melalui kode dan desain.",
    subTagline:
      "Siswa kelas 12 Rekayasa Perangkat Lunak di SMK Negeri 10 Surabaya. Tertarik pada pengembangan web, aplikasi, dan eksplorasi teknologi.",
    education: row.education,
    bio: row.bio,
    publicEmail: row.publicEmail ?? "",
    githubUrl: row.githubUrl ?? "",
    linkedinUrl: row.linkedinUrl ?? "",
  };
}

export type PublicProject = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  role: string;
  technologies: string[];
  workStatus: WorkStatus;
  period: string;
  context: string;
  contributions: string[];
  features: string[];
  process: string[];
  challenges: string;
  learnings: string;
  currentState: string;
  repositoryUrl: string | null;
  demoUrl: string | null;
  coverImageUrl: string | null;
};

async function toPublicProject(
  db: ReturnType<typeof getDb>,
  row: typeof projects.$inferSelect,
): Promise<PublicProject> {
  const techs = await db
    .select({ name: projectTechnologies.technologyName })
    .from(projectTechnologies)
    .where(eq(projectTechnologies.projectId, row.id));
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    category: row.category,
    role: row.role,
    technologies: techs.map((t) => t.name),
    workStatus: row.workStatus,
    period: row.period ?? "",
    context: row.context,
    contributions: row.contributions,
    features: row.features,
    process: row.process,
    challenges: row.challenges,
    learnings: row.learnings,
    currentState: row.currentState,
    repositoryUrl: row.repositoryUrl,
    demoUrl: row.demoUrl,
    coverImageUrl: row.coverImageUrl,
  };
}

export async function getPublishedProjects(
  filter?: { category?: string; technology?: string },
): Promise<PublicProject[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");
  const db = getDb();
  const conditions = [eq(projects.publicationStatus, "published")];
  if (filter?.category) {
    conditions.push(eq(projects.category, filter.category));
  }
  let rows;
  if (filter?.technology) {
    rows = await db
      .select({ project: projects })
      .from(projects)
      .innerJoin(
        projectTechnologies,
        eq(projectTechnologies.projectId, projects.id),
      )
      .where(
        and(
          ...conditions,
          eq(projectTechnologies.technologyName, filter.technology),
        ),
      )
      .orderBy(asc(projects.sortOrder));
    const unique = new Map<number, typeof projects.$inferSelect>();
    for (const row of rows) unique.set(row.project.id, row.project);
    return Promise.all(
      [...unique.values()].map((row) => toPublicProject(db, row)),
    );
  }
  rows = await db
    .select()
    .from(projects)
    .where(and(...conditions))
    .orderBy(asc(projects.sortOrder));
  return Promise.all(rows.map((row) => toPublicProject(db, row)));
}

export type ProjectFilterOptions = {
  categories: string[];
  technologies: string[];
};

export async function getProjectFilterOptions(): Promise<ProjectFilterOptions> {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");
  const db = getDb();
  const [cats, techs] = await Promise.all([
    db
      .selectDistinct({ name: projects.category })
      .from(projects)
      .where(eq(projects.publicationStatus, "published"))
      .orderBy(asc(projects.category)),
    db
      .selectDistinct({ name: projectTechnologies.technologyName })
      .from(projectTechnologies)
      .innerJoin(
        projects,
        eq(projectTechnologies.projectId, projects.id),
      )
      .where(eq(projects.publicationStatus, "published"))
      .orderBy(asc(projectTechnologies.technologyName)),
  ]);
  return {
    categories: cats.map((c) => c.name),
    technologies: techs.map((t) => t.name),
  };
}

export async function getProjectBySlug(
  slug: string,
): Promise<PublicProject | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");
  const db = getDb();
  const rows = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.slug, slug),
        eq(projects.publicationStatus, "published"),
      ),
    )
    .limit(1);
  const row = rows[0];
  if (!row) return undefined;
  return toPublicProject(db, row);
}

export type PublicAchievement = {
  rank: string;
  title: string;
  scope: string;
  year: string;
  description: string;
  detail: string;
  evidenceUrl?: string;
};

export async function getAchievement(): Promise<PublicAchievement | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("achievements");
  const db = getDb();
  const rows = await db
    .select()
    .from(achievements)
    .where(eq(achievements.publicationStatus, "published"))
    .orderBy(asc(achievements.sortOrder))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  return {
    rank: row.rank,
    title: `${row.title}`,
    scope: `${row.organizer} • ${row.location}`,
    year: row.competedAt ? row.competedAt.slice(0, 4) : "",
    description: row.description,
    detail: `Detail tanggal: lomba ${row.competedAt ? formatDateId(row.competedAt) : "—"}, pengumuman ${row.announcedAt ? formatDateId(row.announcedAt) : "—"}.`,
    evidenceUrl: row.evidenceUrl ?? undefined,
  };
}

export type PublicExperience = {
  organization: string;
  role: string;
  period: string;
  summary: string;
  contributions: string[];
  technologies: string[];
  relatedProjectHref?: string;
  relatedProjectLabel?: string;
  evidenceUrl?: string;
};

export async function getExperiences(): Promise<PublicExperience[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("experiences");
  const db = getDb();
  const rows = await db
    .select()
    .from(experiences)
    .where(eq(experiences.publicationStatus, "published"))
    .orderBy(asc(experiences.sortOrder));
  return rows.map((row) => ({
    organization: row.organization,
    role: row.role,
    period:
      row.startDate && row.endDate
        ? formatRangeId(row.startDate, row.endDate)
        : "",
    summary: row.summary,
    contributions: row.responsibilities,
    technologies: row.technologies,
    relatedProjectHref: row.relatedProjectSlug
      ? `/projects/${row.relatedProjectSlug}`
      : undefined,
    relatedProjectLabel: row.relatedProjectSlug
      ? "Lihat proyek terkait"
      : undefined,
    evidenceUrl: row.evidenceUrl ?? undefined,
  }));
}

export type PublicArticle = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  publishedLabel: string;
};

function toPublicArticle(row: typeof articles.$inferSelect): PublicArticle {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImageUrl: row.coverImageUrl,
    publishedLabel: row.publishedAt
      ? formatDateId(row.publishedAt.toISOString().slice(0, 10))
      : "",
  };
}

export async function getPublishedArticles(): Promise<PublicArticle[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");
  const db = getDb();
  const rows = await db
    .select()
    .from(articles)
    .where(eq(articles.publicationStatus, "published"))
    .orderBy(asc(articles.sortOrder), desc(articles.publishedAt));
  return rows.map(toPublicArticle);
}

export async function getArticleBySlug(
  slug: string,
): Promise<PublicArticle | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");
  const db = getDb();
  const rows = await db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.slug, slug),
        eq(articles.publicationStatus, "published"),
      ),
    )
    .limit(1);
  const row = rows[0];
  if (!row) return undefined;
  return toPublicArticle(row);
}
