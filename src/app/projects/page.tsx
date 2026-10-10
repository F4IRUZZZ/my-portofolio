import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { getProjectFilterOptions, getPublishedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Daftar Proyek — Fairuz.dev",
  description:
    "Karya Alfairuz Atthariq Satria selama pembelajaran dan PKL, ditulis apa adanya.",
};

const selectClass =
  "rounded-control border border-border bg-surface px-3 py-2 text-sm text-foreground";

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; teknologi?: string }>;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            level={1}
            eyebrow="Portofolio"
            title="Daftar Proyek"
            description="Karya yang dikerjakan selama pembelajaran dan PKL. Status pengerjaan ditulis jujur pada setiap proyek."
          />
        </Reveal>
        <Suspense fallback={<LoadingSkeleton lines={4} />}>
          <FilteredProjects searchParams={searchParams} />
        </Suspense>
      </Container>
    </section>
  );
}

async function FilteredProjects({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; teknologi?: string }>;
}) {
  const { kategori, teknologi } = await searchParams;
  const [options, projects] = await Promise.all([
    getProjectFilterOptions(),
    getPublishedProjects({
      category: kategori || undefined,
      technology: teknologi || undefined,
    }),
  ]);
  const filtering = Boolean(kategori || teknologi);

  return (
    <>
      {options.categories.length + options.technologies.length > 0 ? (
        <Reveal delay={60}>
            <form
              method="get"
              action="/projects"
              className="mt-6 flex flex-wrap items-end gap-3"
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="filter-kategori" className="text-xs font-medium text-muted">
                  Kategori
                </label>
                <select
                  id="filter-kategori"
                  name="kategori"
                  defaultValue={kategori ?? ""}
                  className={selectClass}
                >
                  <option value="">Semua kategori</option>
                  {options.categories.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="filter-teknologi" className="text-xs font-medium text-muted">
                  Teknologi
                </label>
                <select
                  id="filter-teknologi"
                  name="teknologi"
                  defaultValue={teknologi ?? ""}
                  className={selectClass}
                >
                  <option value="">Semua teknologi</option>
                  {options.technologies.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="rounded-control bg-accent px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                Terapkan
              </button>
              {filtering ? (
                <Link
                  href="/projects"
                  className="rounded-control border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-elevated"
                >
                  Atur ulang
                </Link>
              ) : null}
            </form>
          </Reveal>
        ) : null}
        {projects.length === 0 ? (
          <div className="mt-8">
            <Reveal>
              <EmptyState
                title="Tidak ada hasil yang cocok."
                description="Coba kategori atau teknologi lain, atau atur ulang filter."
              />
            </Reveal>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 80}>
                <ProjectCard
                  title={project.title}
                  summary={project.summary}
                  category={project.category}
                  technologies={project.technologies}
                  workStatus={project.workStatus}
                  href={`/projects/${project.slug}`}
                  period={project.period}
                  cover={
                    project.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.coverImageUrl}
                        alt={`Cover ${project.title}`}
                        className="h-full w-full object-cover"
                      />
                    ) : undefined
                  }
                />
              </Reveal>
            ))}
          </div>
        )}
    </>
  );
}
