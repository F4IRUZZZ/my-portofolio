import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAdminExperience } from "@/lib/admin-queries";
import { ExperienceForm } from "../../ExperienceForm";

export const metadata: Metadata = {
  title: "Ubah Pengalaman — Fairuz.dev",
  description: "Ubah pengalaman.",
};

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const itemId = Number(id);
  if (!Number.isInteger(itemId)) notFound();
  const item = await getAdminExperience(itemId);
  if (!item) notFound();

  return (
    <div>
      <SectionHeading level={1} eyebrow="CMS" title="Ubah Pengalaman" />
      <p className="mt-2 text-sm text-muted">
        <Link href="/admin/experience" className="text-accent hover:text-accent-hover">
          ← Kembali ke daftar
        </Link>
      </p>
      <div className="mt-6">
        <ExperienceForm item={item} />
      </div>
    </div>
  );
}
