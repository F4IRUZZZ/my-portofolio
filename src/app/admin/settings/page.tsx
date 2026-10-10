import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAuthOptions } from "@/lib/auth";
import { LogoutButton } from "../LogoutButton";

export const metadata: Metadata = {
  title: "Pengaturan — Fairuz.dev",
  description: "Pengaturan CMS.",
};

export default async function AdminSettingsPage() {
  const session = await getServerSession(getAuthOptions());

  return (
    <div className="max-w-2xl">
      <SectionHeading
        level={1}
        eyebrow="CMS"
        title="Pengaturan"
        description="Info sesi admin. Pengaturan lanjutan menyusul bila dibutuhkan."
      />
      <div className="mt-6 rounded-card border border-border bg-surface p-5 sm:p-6">
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
