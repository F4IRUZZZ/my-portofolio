import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";
import { deleteExperience } from "@/lib/actions/experiences";
import { getAdminExperiences } from "@/lib/admin-queries";
import { DeleteButton } from "../_components/DeleteButton";

export const metadata: Metadata = {
  title: "Kelola Pengalaman — Fairuz.dev",
  description: "Kelola pengalaman PKL.",
};

export default async function AdminExperiencePage() {
  const items = await getAdminExperiences();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading level={1} eyebrow="CMS" title="Pengalaman" />
        <Link
          href="/admin/experience/new"
          className="inline-flex items-center gap-1.5 rounded-control bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          <Plus aria-hidden="true" className="h-4 w-4" />
          Tambah Pengalaman
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          rows={items}
          keyOf={(row) => row.id}
          editHrefOf={(row) => `/admin/experience/${row.id}/edit`}
          emptyTitle="Belum ada pengalaman."
          columns={[
            {
              header: "Organisasi",
              render: (row) => (
                <span className="font-medium text-foreground">
                  {row.role} — {row.organization}
                </span>
              ),
            },
            {
              header: "Status",
              render: (row) => (
                <StatusBadge
                  status={row.publicationStatus === "published" ? "Published" : "Draft"}
                />
              ),
            },
            {
              header: "Hapus",
              render: (row) => (
                <DeleteButton
                  title="Hapus pengalaman?"
                  itemName={row.organization}
                  onDelete={deleteExperience.bind(null, row.id)}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
