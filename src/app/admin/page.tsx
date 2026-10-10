import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  getAdminCounts,
  getAdminProfile,
  getRecentActivity,
} from "@/lib/admin-queries";

export const metadata: Metadata = {
  title: "Dashboard Admin — Fairuz.dev",
  description: "Dashboard CMS privat Fairuz.dev.",
};

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-card border border-border bg-surface p-5 transition-colors duration-200 hover:bg-elevated"
    >
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </Link>
  );
}

export default async function AdminPage() {
  const [counts, recent, profile] = await Promise.all([
    getAdminCounts(),
    getRecentActivity(),
    getAdminProfile(),
  ]);

  const profileIncomplete =
    !profile ||
    !profile.publicEmail ||
    !profile.githubUrl ||
    !profile.linkedinUrl;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          level={1}
          eyebrow="Area privat"
          title="Dashboard"
          description="Ringkasan konten dari database."
        />
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-1.5 rounded-control bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          <Plus aria-hidden="true" className="h-4 w-4" />
          Tambah Proyek
        </Link>
      </div>

      {profileIncomplete ? (
        <p
          role="alert"
          className="mt-6 rounded-card border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning"
        >
          Profil belum lengkap (email/GitHub/LinkedIn).{" "}
          <Link href="/admin/profile" className="font-medium underline">
            Lengkapi profil
          </Link>
        </p>
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Proyek published"
          value={counts.projectsPublished}
          href="/admin/projects"
        />
        <StatCard
          label="Proyek draft"
          value={counts.projectsDraft}
          href="/admin/projects"
        />
        <StatCard
          label="Prestasi published"
          value={counts.achievementsPublished}
          href="/admin/achievements"
        />
        <StatCard
          label="Pengalaman"
          value={counts.experiencesCount}
          href="/admin/experience"
        />
        <StatCard
          label="Artikel published"
          value={counts.articlesPublished}
          href="/admin/articles"
        />
        <StatCard
          label="Artikel draft"
          value={counts.articlesDraft}
          href="/admin/articles"
        />
      </div>

      <h2 className="mt-10 text-lg font-semibold text-foreground">
        Konten terbaru
      </h2>
      {recent.length === 0 ? (
        <p className="mt-3 text-sm text-muted">Belum ada konten.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {recent.map((item) => (
            <li
              key={`${item.type}-${item.title}`}
              className="flex flex-wrap items-center gap-2 rounded-card border border-border bg-surface px-4 py-3 text-sm"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                {item.type}
              </span>
              <span className="min-w-0 flex-1 truncate text-foreground">
                {item.title}
              </span>
              <StatusBadge
                status={
                  item.status === "published" ? "Published" : "Draft"
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
