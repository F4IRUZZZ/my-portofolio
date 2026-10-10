import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Daftar Proyek — Fairuz.dev",
  description:
    "Karya Alfairuz Atthariq Satria selama pembelajaran dan PKL, ditulis apa adanya.",
};

export default function ProjectsPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          level={1}
          eyebrow="Portofolio"
          title="Daftar Proyek"
          description="Karya yang dikerjakan selama pembelajaran dan PKL. Status pengerjaan ditulis jujur pada setiap proyek."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              summary={project.summary}
              category={project.category}
              technologies={project.technologies}
              workStatus={project.workStatus}
              href={`/projects/${project.slug}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
