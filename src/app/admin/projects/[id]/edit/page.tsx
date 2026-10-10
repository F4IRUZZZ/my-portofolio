import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAdminProject } from "@/lib/admin-queries";
import { ProjectForm } from "../../ProjectForm";

export const metadata: Metadata = {
  title: "Ubah Proyek — Fairuz.dev",
  description: "Ubah proyek portofolio.",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);
  if (!Number.isInteger(projectId)) notFound();
  const project = await getAdminProject(projectId);
  if (!project) notFound();

  return (
    <div>
      <SectionHeading level={1} eyebrow="CMS" title="Ubah Proyek" />
      <p className="mt-2 text-sm text-muted">
        <Link href="/admin/projects" className="text-accent hover:text-accent-hover">
          ← Kembali ke daftar
        </Link>
      </p>
      <div className="mt-6">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
