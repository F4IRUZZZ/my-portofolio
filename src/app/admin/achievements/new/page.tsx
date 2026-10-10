import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementForm } from "../AchievementForm";

export const metadata: Metadata = {
  title: "Tambah Prestasi — Fairuz.dev",
  description: "Tambah prestasi baru.",
};

export default function NewAchievementPage() {
  return (
    <div>
      <SectionHeading level={1} eyebrow="CMS" title="Tambah Prestasi" />
      <p className="mt-2 text-sm text-muted">
        <Link href="/admin/achievements" className="text-accent hover:text-accent-hover">
          ← Kembali ke daftar
        </Link>
      </p>
      <div className="mt-6">
        <AchievementForm />
      </div>
    </div>
  );
}
