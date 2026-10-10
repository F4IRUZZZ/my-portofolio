"use server";

import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { getDb } from "@/db";
import { experiences } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-queries";
import { experienceSchema } from "@/lib/validation";
import type { ActionState } from "./projects";

export type { ActionState };

function fail(message: string, errors?: Record<string, string[]>): ActionState {
  return { ok: false, message, errors };
}

function refresh() {
  revalidateTag("experiences", "hours");
  revalidatePath("/experience");
  revalidatePath("/");
}

export async function upsertExperience(
  id: number | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return fail("Butuh sesi admin. Silakan login ulang.");
  }
  const parsed = experienceSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return fail("Periksa kembali isian form.", parsed.error.flatten().fieldErrors);
  }
  const data = parsed.data;
  try {
    const db = getDb();
    const values = {
      organization: data.organization,
      role: data.role,
      location: data.location || null,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      summary: data.summary,
      responsibilities: data.responsibilities,
      technologies: data.technologies,
      relatedProjectSlug: data.relatedProjectSlug || null,
      publicationStatus: data.publicationStatus,
      updatedAt: new Date(),
    };
    if (id === null) {
      await db.insert(experiences).values({ ...values, sortOrder: 99 });
    } else {
      await db.update(experiences).set(values).where(eq(experiences.id, id));
    }
    refresh();
    return {
      ok: true,
      message:
        data.publicationStatus === "published"
          ? "Pengalaman dipublikasikan."
          : "Draft pengalaman disimpan.",
    };
  } catch (error) {
    console.error("upsertExperience gagal:", error);
    return fail("Gagal menyimpan. Coba lagi.");
  }
}

export async function deleteExperience(id: number): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Butuh sesi admin. Silakan login ulang." };
  }
  try {
    const db = getDb();
    await db.delete(experiences).where(eq(experiences.id, id));
    refresh();
    return { ok: true, message: "Pengalaman dihapus." };
  } catch (error) {
    console.error("deleteExperience gagal:", error);
    return { ok: false, message: "Gagal menghapus. Coba lagi." };
  }
}
