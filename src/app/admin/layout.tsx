import { Suspense } from "react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { connection } from "next/server";
import { Container } from "@/components/ui/Container";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminProviders } from "./providers";

// Area privat: tidak boleh terindeks mesin pencari.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Area admin bergantung pada sesi: render saat request (blocking),
// bukan prerender. (Pengganti force-dynamic di era cacheComponents.)
export const instant = false;
async function AdminDynamic({ children }: { children: ReactNode }) {
  await connection();
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <AdminSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
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
