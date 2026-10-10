import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
        <div className="mt-8">
          <EmptyState
            title="Linimasa pengalaman menyusul."
            description="Detail pengalaman PKL akan dilengkapi di Fase 2."
          />
        </div>
      </Container>
    </section>
  );
}
