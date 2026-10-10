import { Suspense } from "react";
import type { ReactNode } from "react";
import { connection } from "next/server";
import { Container } from "@/components/ui/Container";
import { AdminProviders } from "./providers";

// Area admin bergantung pada sesi: sub-pohon ini di-render saat request
// (streaming), cangkang layout tetap bisa di-prerender.
async function AdminDynamic({ children }: { children: ReactNode }) {
  await connection();
  return <>{children}</>;
}

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <AdminProviders>
      <section className="py-16 sm:py-20">
        <Container>
          <Suspense
            fallback={<p className="text-sm text-muted">Memuat…</p>}
          >
            <AdminDynamic>{children}</AdminDynamic>
          </Suspense>
        </Container>
      </section>
    </AdminProviders>
  );
}
