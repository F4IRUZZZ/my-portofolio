import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAdminAchievement } from "@/lib/admin-queries";
import { AchievementForm } from "../../AchievementForm";

export const metadata: Metadata = {
  title: "Ubah Prestasi — Fairuz.dev",
  description: "Ubah prestasi.",
};

export default async function EditAchievementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const itemId = Number(id);
  if (!Number.isInteger(itemId)) notFound();
  const item = await getAdminAchievement(itemId);
  if (!item) notFound();

  return (
    <div>
      <SectionHeading level={1} eyebrow="CMS" title="Ubah Prestasi" />
      <p className="mt-2 text-sm text-muted">
        <Link href="/admin/achievements" className="text-accent hover:text-accent-hover">
          ← Kembali ke daftar
        </Link>
      </p>
      <div className="mt-6">
        <AchievementForm item={item} />
      </div>
    </div>
  );
}
