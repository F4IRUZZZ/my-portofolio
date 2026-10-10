import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ProjectsPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          level={1}
          eyebrow="Portofolio"
          title="Daftar Proyek"
          description="Karya yang dikerjakan selama pembelajaran dan PKL."
        />
        <div className="mt-8">
          <EmptyState title="Proyek akan ditambahkan di sini." />
        </div>
      </Container>
    </section>
  );
}
