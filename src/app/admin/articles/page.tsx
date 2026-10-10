import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";
import { deleteArticle } from "@/lib/actions/articles";
import { getAdminArticles } from "@/lib/admin-queries";
import { DeleteButton } from "../_components/DeleteButton";

export const metadata: Metadata = {
  title: "Kelola Artikel — Fairuz.dev",
  description: "Kelola artikel.",
};

export default async function AdminArticlesPage() {
  const items = await getAdminArticles();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading level={1} eyebrow="CMS" title="Artikel" />
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-1.5 rounded-control bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          <Plus aria-hidden="true" className="h-4 w-4" />
          Tambah Artikel
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          rows={items}
          keyOf={(row) => row.id}
          editHrefOf={(row) => `/admin/articles/${row.id}/edit`}
          emptyTitle="Belum ada artikel."
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
                <StatusBadge
                  status={row.publicationStatus === "published" ? "Published" : "Draft"}
                />
              ),
            },
            {
              header: "Hapus",
              render: (row) => (
                <DeleteButton
                  title="Hapus artikel?"
                  itemName={row.title}
                  onDelete={deleteArticle.bind(null, row.id)}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
