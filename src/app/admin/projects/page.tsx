import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";
import { deleteProject } from "@/lib/actions/projects";
import { getAdminProjects } from "@/lib/admin-queries";
import { DeleteButton } from "../_components/DeleteButton";

export const metadata: Metadata = {
  title: "Kelola Proyek — Fairuz.dev",
  description: "Kelola proyek portofolio.",
};

function formatDate(value: Date): string {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading level={1} eyebrow="CMS" title="Proyek" />
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-1.5 rounded-control bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          <Plus aria-hidden="true" className="h-4 w-4" />
          Tambah Proyek
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          rows={projects}
          keyOf={(row) => row.id}
          editHrefOf={(row) => `/admin/projects/${row.id}/edit`}
          emptyTitle="Belum ada proyek. Tambahkan yang pertama."
          columns={[
            {
              header: "Judul",
              render: (row) => (
                <span className="font-medium text-foreground">{row.title}</span>
              ),
            },
            {
              header: "Status",
              render: (row) => (
                <span className="inline-flex gap-1.5">
                  <StatusBadge
                    status={row.publicationStatus === "published" ? "Published" : "Draft"}
                  />
                  <StatusBadge
                    status={
                      row.workStatus as "In Progress" | "Completed" | "Archived"
                    }
                  />
                </span>
              ),
            },
            {
              header: "Diperbarui",
              render: (row) => formatDate(row.updatedAt),
            },
            {
              header: "Hapus",
              render: (row) => (
                <DeleteButton
                  title="Hapus proyek?"
                  itemName={row.title}
                  onDelete={deleteProject.bind(null, row.id)}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
