import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
        <div className="mt-8">
          <EmptyState
            title="Data prestasi sedang diverifikasi."
            description="Prestasi akan ditampilkan setelah tahun dan bukti pendukung dikonfirmasi."
          />
        </div>
      </Container>
    </section>
  );
}
