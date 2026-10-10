import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementCard } from "@/components/ui/AchievementCard";
import { achievement } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Prestasi — Fairuz.dev",
  description:
    "Pencapaian terverifikasi Alfairuz Atthariq Satria beserta buktinya bila tersedia.",
};

export default function AchievementsPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          level={1}
          eyebrow="Pencapaian"
          title="Prestasi"
          description="Pencapaian yang terverifikasi beserta buktinya bila tersedia."
        />
        <div className="mt-8 grid max-w-xl gap-6">
          <AchievementCard
            rank={achievement.rank}
            title={achievement.title}
            scope={`${achievement.scope} • ${achievement.location}`}
            year="2026"
            description={`${achievement.description} Detail tanggal: lomba ${achievement.competedAt}, pengumuman ${achievement.announcedAt}.`}
          />
        </div>
      </Container>
    </section>
  );
}
