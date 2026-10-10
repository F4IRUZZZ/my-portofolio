import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAdminProfile } from "@/lib/admin-queries";
import { ProfileForm } from "./ProfileForm";

export const metadata: Metadata = {
  title: "Kelola Profil — Fairuz.dev",
  description: "Kelola profil portofolio.",
};

export default async function AdminProfilePage() {
  const profile = await getAdminProfile();

  return (
    <div>
      <SectionHeading
        level={1}
        eyebrow="CMS"
        title="Profil"
        description="Satu profil aktif untuk seluruh website."
      />
      <div className="mt-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
