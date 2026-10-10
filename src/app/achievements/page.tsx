import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementCard } from "@/components/ui/AchievementCard";
import { getAchievement } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Prestasi — Fairuz.dev",
  description:
    "Pencapaian terverifikasi Alfairuz Atthariq Satria beserta buktinya bila tersedia.",
};

export default async function AchievementsPage() {
  const achievement = await getAchievement();

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
          {achievement ? (
            <AchievementCard
              rank={achievement.rank}
              title={achievement.title}
              scope={achievement.scope}
              year={achievement.year}
              description={`${achievement.description} ${achievement.detail}`}
              evidenceUrl={achievement.evidenceUrl}
              evidenceLabel="Lihat piagam"
            />
          ) : (
            <EmptyState title="Belum ada prestasi yang dipublikasikan." />
          )}
        </div>
      </Container>
    </section>
  );
}
