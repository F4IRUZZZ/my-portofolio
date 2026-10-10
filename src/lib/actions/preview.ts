"use server";

import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { articles, projects } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-queries";

export type PreviewTokenState = {
  ok: boolean;
  message: string;
  token?: string;
};

function newToken(): string {
  return randomBytes(16).toString("hex");
}

/*
 * Membuat (bila kosong) atau mengacak ulang token pratinjau.
 * Token lama langsung tidak berlaku. Tabrakan slug-token praktis
 * mustahil, tetapi tetap dicek dan dibuat ulang bila terjadi.
 */
export async function rotatePreviewToken(
  kind: "project" | "article",
  id: number,
): Promise<PreviewTokenState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Butuh sesi admin. Silakan login ulang." };
  }
  try {
    const db = getDb();
    const table = kind === "project" ? projects : articles;
    for (let attempt = 0; attempt < 3; attempt++) {
      const token = newToken();
      const clash = await db
        .select({ id: table.id })
        .from(table)
        .where(eq(table.previewToken, token))
        .limit(1);
      if (clash.length > 0) continue;
      await db
        .update(table)
        .set({ previewToken: token, updatedAt: new Date() })
        .where(eq(table.id, id));
      const path = kind === "project" ? "/projects" : "/articles";
      revalidatePath(path);
      return { ok: true, message: "Link pratinjau diperbarui.", token };
    }
    return { ok: false, message: "Gagal membuat token. Coba lagi." };
  } catch (error) {
    console.error("rotatePreviewToken gagal:", error);
    return { ok: false, message: "Gagal membuat token. Coba lagi." };
  }
}
