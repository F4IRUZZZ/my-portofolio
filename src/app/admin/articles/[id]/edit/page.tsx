import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAdminArticle } from "@/lib/admin-queries";
import { PreviewLinkBox } from "../../../_components/PreviewLinkBox";
import { ArticleForm } from "../../ArticleForm";

export const metadata: Metadata = {
  title: "Ubah Artikel — Fairuz.dev",
  description: "Ubah artikel.",
};

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const itemId = Number(id);
  if (!Number.isInteger(itemId)) notFound();
  const item = await getAdminArticle(itemId);
  if (!item) notFound();

  return (
    <div>
      <SectionHeading level={1} eyebrow="CMS" title="Ubah Artikel" />
      <p className="mt-2 text-sm text-muted">
        <Link href="/admin/articles" className="text-accent hover:text-accent-hover">
          ← Kembali ke daftar
        </Link>
      </p>
      <div className="mt-6 flex flex-col gap-6">
        <PreviewLinkBox
          kind="article"
          id={item.id}
          slug={item.slug}
          initialToken={item.previewToken}
          basePath="/articles"
        />
        <ArticleForm item={item} />
      </div>
    </div>
  );
}
