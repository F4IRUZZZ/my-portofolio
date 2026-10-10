import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceForm } from "../ExperienceForm";

export const metadata: Metadata = {
  title: "Tambah Pengalaman — Fairuz.dev",
  description: "Tambah pengalaman baru.",
};

export default function NewExperiencePage() {
  return (
    <div>
      <SectionHeading level={1} eyebrow="CMS" title="Tambah Pengalaman" />
      <p className="mt-2 text-sm text-muted">
        <Link href="/admin/experience" className="text-accent hover:text-accent-hover">
          ← Kembali ke daftar
        </Link>
      </p>
      <div className="mt-6">
        <ExperienceForm />
      </div>
    </div>
  );
}
