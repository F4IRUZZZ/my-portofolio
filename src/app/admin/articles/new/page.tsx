import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleForm } from "../ArticleForm";

export const metadata: Metadata = {
  title: "Tambah Artikel — Fairuz.dev",
  description: "Tambah artikel baru.",
};

export default function NewArticlePage() {
  return (
    <div>
      <SectionHeading level={1} eyebrow="CMS" title="Tambah Artikel" />
      <p className="mt-2 text-sm text-muted">
        <Link href="/admin/articles" className="text-accent hover:text-accent-hover">
          ← Kembali ke daftar
        </Link>
      </p>
      <div className="mt-6">
        <ArticleForm />
      </div>
    </div>
  );
}
