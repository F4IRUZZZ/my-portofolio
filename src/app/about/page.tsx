import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          level={1}
          eyebrow="Profil"
          title="Tentang Saya"
          description="Bio, pendidikan, perjalanan belajar, dan TechStack."
        />
        <div className="mt-8">
          <EmptyState
            title="Profil lengkap menyusul."
            description="Bagian ini sedang ditulis dan akan dilengkapi di Fase 2."
          />
        </div>
      </Container>
    </section>
  );
}
