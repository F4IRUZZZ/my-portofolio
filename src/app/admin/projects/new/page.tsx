import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectForm } from "../ProjectForm";

export const metadata: Metadata = {
  title: "Tambah Proyek — Fairuz.dev",
  description: "Tambah proyek portofolio baru.",
};

export default function NewProjectPage() {
  return (
    <div>
      <SectionHeading level={1} eyebrow="CMS" title="Tambah Proyek" />
      <p className="mt-2 text-sm text-muted">
        <Link href="/admin/projects" className="text-accent hover:text-accent-hover">
          ← Kembali ke daftar
        </Link>
      </p>
      <div className="mt-6">
        <ProjectForm />
      </div>
    </div>
  );
}
