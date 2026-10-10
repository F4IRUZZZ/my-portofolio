import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/Buttons";

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
