import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAuthOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { LogoutButton } from "./LogoutButton";

export const metadata: Metadata = {
  title: "Dashboard Admin — Fairuz.dev",
  description: "Dashboard CMS privat Fairuz.dev.",
};

export default async function AdminPage() {
  const session = await getServerSession(getAuthOptions());

  return (
    <div className="max-w-2xl">
      <SectionHeading
        level={1}
        eyebrow="Area privat"
        title="Dashboard"
        description="Masuk sebagai admin. UI CMS (proyek, prestasi, pengalaman, profil) dibangun di Fase 4."
      />
      <div className="mt-8 rounded-card border border-border bg-surface p-5 sm:p-6">
        <p className="text-sm text-muted">Masuk sebagai</p>
        <p className="mt-1 font-medium text-foreground">
          {session?.user?.email ?? "admin"}
        </p>
        <div className="mt-5">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
