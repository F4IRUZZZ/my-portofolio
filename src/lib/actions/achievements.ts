"use server";

import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { getDb } from "@/db";
import { achievements } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-queries";
import { achievementSchema } from "@/lib/validation";
import type { ActionState } from "./projects";

export type { ActionState };

function fail(message: string, errors?: Record<string, string[]>): ActionState {
  return { ok: false, message, errors };
}

function refresh() {
  revalidateTag("achievements", "hours");
  revalidatePath("/achievements");
  revalidatePath("/");
}

export async function upsertAchievement(
  id: number | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return fail("Butuh sesi admin. Silakan login ulang.");
  }
  const parsed = achievementSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return fail("Periksa kembali isian form.", parsed.error.flatten().fieldErrors);
  }
  const data = parsed.data;
  try {
    const db = getDb();
    const values = {
      title: data.title,
      organizer: data.organizer,
      category: data.category,
      rank: data.rank,
      location: data.location,
      competedAt: data.competedAt || null,
      announcedAt: data.announcedAt || null,
      description: data.description,
      evidenceUrl: data.evidenceUrl || null,
      publicationStatus: data.publicationStatus,
      updatedAt: new Date(),
    };
    if (id === null) {
      await db.insert(achievements).values({ ...values, sortOrder: 99 });
    } else {
      await db.update(achievements).set(values).where(eq(achievements.id, id));
    }
    refresh();
    return {
      ok: true,
      message:
        data.publicationStatus === "published"
          ? "Prestasi dipublikasikan."
          : "Draft prestasi disimpan.",
    };
  } catch (error) {
    console.error("upsertAchievement gagal:", error);
    return fail("Gagal menyimpan. Coba lagi.");
  }
}

export async function deleteAchievement(id: number): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Butuh sesi admin. Silakan login ulang." };
  }
  try {
    const db = getDb();
    await db.delete(achievements).where(eq(achievements.id, id));
    refresh();
    return { ok: true, message: "Prestasi dihapus." };
  } catch (error) {
    console.error("deleteAchievement gagal:", error);
    return { ok: false, message: "Gagal menghapus. Coba lagi." };
  }
}
