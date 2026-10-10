import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceTimeline } from "@/components/ui/ExperienceTimeline";
import { experiences } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Pengalaman — Fairuz.dev",
  description:
    "Pengalaman PKL Alfairuz Atthariq Satria dengan kontribusi yang dicatat jujur.",
};

export default function ExperiencePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          level={1}
          eyebrow="Perjalanan"
          title="Pengalaman"
          description="Pengalaman PKL dan kontribusi yang benar-benar dilakukan."
        />
        <div className="mt-10 max-w-3xl">
          <ExperienceTimeline entries={experiences} />
        </div>
      </Container>
    </section>
  );
}
