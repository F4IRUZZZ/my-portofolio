import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Fairuz.dev",
  description:
    "Kebijakan privasi singkat Fairuz.dev terkait pemrosesan data pengunjung.",
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          level={1}
          eyebrow="Legal"
          title="Kebijakan Privasi"
        />
        <div className="mt-6 flex max-w-3xl flex-col gap-4 leading-relaxed text-muted">
          <p>
            Fairuz.dev adalah website portofolio statis. Saat ini website
            tidak menjalankan formulir kontak, analitik, atau penyimpanan
            data pengunjung apa pun.
          </p>
          <p>
            Tautan eksternal (GitHub, LinkedIn, email) mengikuti kebijakan
            privasi layanan masing-masing. Halaman ini akan diperbarui jika
            website mulai memproses data pengunjung di kemudian hari.
          </p>
        </div>
      </Container>
    </section>
  );
}
