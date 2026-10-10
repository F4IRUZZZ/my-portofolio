import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/Buttons";

// Halaman ini juga ter-render untuk slug asing pada route dinamis yang
// status HTTP-nya tetap 200 (batasan streaming Cache Components, lihat
// PR #16). noindex memastikan mesin pencari membuang URL semacam itu.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-24 text-center sm:py-32">
      <Container>
        <p className="text-sm font-medium tracking-wide text-accent">404</p>
        <h1 className="mx-auto mt-2 max-w-md text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          Alamat yang kamu tuju tidak ada atau sudah dipindahkan. Kembali ke
          beranda untuk melanjutkan.
        </p>
        <div className="mt-8">
          <PrimaryButton href="/">Kembali ke beranda</PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
