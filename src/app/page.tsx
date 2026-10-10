import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementCard } from "@/components/ui/AchievementCard";
import { ExperienceTimeline } from "@/components/ui/ExperienceTimeline";
import { ProjectCard } from "@/components/ui/ProjectCard";
import {
  getAchievement,
  getExperiences,
  getProfile,
  getPublishedProjects,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Fairuz.dev — Student Developer",
  description:
    "Portofolio Alfairuz Atthariq Satria: proyek, prestasi LKS AI, pengalaman PKL, dan kontak.",
};

export default async function Home() {
  const [profile, featured, achievement, experiences] = await Promise.all([
    getProfile(),
    getPublishedProjects(),
    getAchievement(),
    getExperiences(),
  ]);

  return (
    <>
      <section aria-labelledby="hero-heading" className="py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              {profile.headline}
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              {profile.tagline}
            </h1>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              {profile.subTagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/projects">Lihat Proyek</PrimaryButton>
              <SecondaryButton href="/about">Tentang Saya</SecondaryButton>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="proyek-unggulan-heading" className="py-8">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Portofolio"
              title="Proyek Unggulan"
              description="Karya yang dikerjakan selama pembelajaran dan PKL, ditulis apa adanya."
            />
            <Link
              href="/projects"
              className="text-sm font-medium text-accent hover:text-accent-hover"
            >
              Lihat semua proyek
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                summary={project.summary}
                category={project.category}
                technologies={project.technologies}
                workStatus={project.workStatus}
                href={`/projects/${project.slug}`}
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
            ))}
          </div>
        </Container>
      </section>

      {achievement ? (
        <section aria-labelledby="prestasi-heading" className="py-8">
          <Container>
            <SectionHeading eyebrow="Pencapaian" title="Prestasi Utama" />
            <div className="mt-8 max-w-xl">
              <AchievementCard
                rank={achievement.rank}
                title={achievement.title}
                scope={achievement.scope}
                year={achievement.year}
                description={achievement.description}
              />
            </div>
            <Link
              href="/achievements"
              className="mt-6 inline-block text-sm font-medium text-accent hover:text-accent-hover"
            >
              Lihat semua prestasi
            </Link>
          </Container>
        </section>
      ) : null}

      <section aria-labelledby="pengalaman-heading" className="py-8">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Perjalanan"
              title="Ringkasan Pengalaman"
              description="Dua periode PKL dengan kontribusi yang dicatat terpisah dan jujur."
            />
            <Link
              href="/experience"
              className="text-sm font-medium text-accent hover:text-accent-hover"
            >
              Lihat pengalaman lengkap
            </Link>
          </div>
          <div className="mt-8 max-w-3xl">
            <ExperienceTimeline entries={experiences} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="kontak-heading" className="py-8">
        <Container>
          <div className="rounded-card border border-border bg-surface p-8 text-center sm:p-12">
            <h2
              id="kontak-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Tertarik berkolaborasi atau berdiskusi?
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
              Saya terbuka untuk magang, proyek pembelajaran, dan kolaborasi.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <PrimaryButton href="/contact">Hubungi Saya</PrimaryButton>
              <SecondaryButton href="/about">Tentang Saya</SecondaryButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
