import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <>
      <section aria-labelledby="hero-heading" className="py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              Student Developer
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              Saya Fairuz, Student Developer yang membangun solusi digital
              melalui kode dan desain.
            </h1>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Siswa kelas 12 Rekayasa Perangkat Lunak di SMK Negeri 10
              Surabaya. Tertarik pada pengembangan web, aplikasi, dan
              eksplorasi teknologi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/projects">Lihat Proyek</PrimaryButton>
              <SecondaryButton href="/about">Tentang Saya</SecondaryButton>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="proyek-unggulan-heading" className="py-8">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Portofolio"
              title="Proyek Unggulan"
              description="Karya yang dikerjakan selama pembelajaran dan PKL, ditulis apa adanya."
            />
            <Link
              href="/projects"
              className="text-sm font-medium text-accent hover:text-accent-hover"
            >
              Lihat semua proyek
            </Link>
          </div>
          <div className="mt-8">
            <EmptyState
              title="Proyek akan ditambahkan di sini."
              description="Daftar proyek unggulan sedang disiapkan dan akan diverifikasi sebelum dipublikasikan."
            />
          </div>
        </Container>
      </section>
    </>
  );
}
