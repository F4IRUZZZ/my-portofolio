import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          level={1}
          eyebrow="Kontak"
          title="Hubungi Saya"
          description="Email publik dan tautan profesional."
        />
        <div className="mt-8">
          <EmptyState
            title="Info kontak menyusul."
            description="Email publik dan tautan profesional akan ditampilkan setelah diverifikasi pemilik."
          />
        </div>
      </Container>
    </section>
  );
}
