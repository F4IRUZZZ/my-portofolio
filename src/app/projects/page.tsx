import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { getPublishedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Daftar Proyek — Fairuz.dev",
  description:
    "Karya Alfairuz Atthariq Satria selama pembelajaran dan PKL, ditulis apa adanya.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

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
      </Container>
    </section>
  );
}
