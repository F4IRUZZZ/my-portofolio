import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { Reveal } from "@/components/ui/Reveal";
import { getProjectBySlug, getPublishedProjects } from "@/lib/queries";

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Proyek tidak ditemukan — Fairuz.dev" };
  return {
    title: `${project.title} — Fairuz.dev`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImageUrl ? [{ url: project.coverImageUrl }] : undefined,
    },
  };
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-2 text-[15px] leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const published = await getPublishedProjects();
  const related = published.filter((item) => item.slug !== slug);

  return (
    <>
      <section className="py-12 sm:py-16">
        <Container>
          <Reveal>
            <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground">
                  Proyek
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="text-foreground">
                {project.title}
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <StatusBadge status={project.workStatus} />
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              {project.category}
              {project.period ? ` • ${project.period}` : ""}
            </span>
          </div>
          </Reveal>

          <Reveal delay={80}>
          {project.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImageUrl}
              alt={`Cover ${project.title}`}
              className="mt-8 aspect-video w-full rounded-card border border-border object-cover"
            />
          ) : (
            <div
              aria-label="Galeri screenshot"
              className="mt-8 flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-card border border-dashed border-border bg-surface text-muted"
            >
              <span className="text-sm font-medium">Gambar menyusul</span>
              <span className="max-w-md px-6 text-center text-xs">
                Screenshot hanya ditampilkan setelah ada izin publikasi.
              </span>
            </div>
          )}
          </Reveal>

          <Reveal delay={120}>
          <div className="mt-10 flex max-w-3xl flex-col gap-8">
            <DetailBlock title="Konteks dan masalah">
              <p>{project.context}</p>
            </DetailBlock>
            <DetailBlock title="Peran dan kontribusi pribadi">
              <p className="font-medium text-foreground">{project.role}</p>
              <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5">
                {project.contributions.map((item) => (
                  <li key={item.slice(0, 24)}>{item}</li>
                ))}
              </ul>
            </DetailBlock>
            <DetailBlock title="Fitur yang telah dibuat">
              <ul className="flex list-disc flex-col gap-1.5 pl-5">
                {project.features.map((item) => (
                  <li key={item.slice(0, 24)}>{item}</li>
                ))}
              </ul>
            </DetailBlock>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                TechStack
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <TechnologyTag name={tech} />
                  </li>
                ))}
              </ul>
            </div>
            <DetailBlock title="Proses dan keputusan teknis">
              <ul className="flex list-disc flex-col gap-1.5 pl-5">
                {project.process.map((item) => (
                  <li key={item.slice(0, 24)}>{item}</li>
                ))}
              </ul>
            </DetailBlock>
            <DetailBlock title="Tantangan dan pembelajaran">
              <p>{project.challenges}</p>
              <p className="mt-2">{project.learnings}</p>
            </DetailBlock>
            <DetailBlock title="Status saat ini dan keterbatasan">
              <p>{project.currentState}</p>
            </DetailBlock>
            {project.repositoryUrl || project.demoUrl ? (
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Tautan
                </h2>
                <div className="mt-2 flex flex-wrap gap-3">
                  {project.repositoryUrl ? (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
                    >
                      Repository
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </a>
                  ) : null}
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
                    >
                      Demo live
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
          </Reveal>
        </Container>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="terkait-heading" className="py-8">
          <Container>
            <Reveal>
              <SectionHeading title="Proyek terkait" />
            </Reveal>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 80}>
                  <ProjectCard
                    title={item.title}
                    summary={item.summary}
                    category={item.category}
                    technologies={item.technologies}
                    workStatus={item.workStatus}
                    href={`/projects/${item.slug}`}
                    period={item.period}
                    cover={
                      item.coverImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.coverImageUrl}
                          alt={`Cover ${item.title}`}
                          className="h-full w-full object-cover"
                        />
                      ) : undefined
                    }
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
