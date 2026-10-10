import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceTimeline } from "@/components/ui/ExperienceTimeline";
import { Reveal } from "@/components/ui/Reveal";
import { getExperiences } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Pengalaman — Fairuz.dev",
  description:
    "Pengalaman PKL Alfairuz Atthariq Satria dengan kontribusi yang dicatat jujur.",
};

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            level={1}
            eyebrow="Perjalanan"
            title="Pengalaman"
            description="Pengalaman PKL dan kontribusi yang benar-benar dilakukan."
          />
        </Reveal>
        <div className="mt-10 max-w-3xl">
          <Reveal>
            {experiences.length > 0 ? (
              <ExperienceTimeline entries={experiences} />
            ) : (
              <EmptyState title="Belum ada pengalaman yang dipublikasikan." />
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
