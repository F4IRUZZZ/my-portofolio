"use server";

import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { getDb } from "@/db";
import { profiles } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-queries";
import { profileSchema } from "@/lib/validation";
import type { ActionState } from "./projects";

export type { ActionState };

export async function upsertProfile(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Butuh sesi admin. Silakan login ulang." };
  }
  const parsed = profileSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return {
      ok: false,
      message: "Periksa kembali isian form.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  const data = parsed.data;
  try {
    const db = getDb();
    const existing = await db.select({ id: profiles.id }).from(profiles).limit(1);
    const values = {
      fullName: data.fullName,
      headline: data.headline,
      bio: data.bio,
      education: data.education,
      publicEmail: data.publicEmail || null,
      githubUrl: data.githubUrl || null,
      linkedinUrl: data.linkedinUrl || null,
      cvUrl: data.cvUrl || null,
      profileImageUrl: data.profileImageUrl || null,
      updatedAt: new Date(),
    };
    if (existing[0]) {
      await db.update(profiles).set(values).where(eq(profiles.id, existing[0].id));
    } else {
      await db.insert(profiles).values(values);
    }
    revalidateTag("profile", "hours");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    return { ok: true, message: "Profil disimpan." };
  } catch (error) {
    console.error("upsertProfile gagal:", error);
    return { ok: false, message: "Gagal menyimpan. Coba lagi." };
  }
}
