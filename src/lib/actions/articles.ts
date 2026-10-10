"use server";

import { and, eq, ne } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { getDb } from "@/db";
import { articles } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-queries";
import { articleSchema, slugify } from "@/lib/validation";
import type { ActionState } from "./projects";

export type { ActionState };

function fail(
  message: string,
  errors?: Record<string, string[]>,
  formData?: FormData,
): ActionState {
  if (!formData) return { ok: false, message, errors };
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") values[key] = value;
  }
  return { ok: false, message, errors, values };
}

function refresh() {
  revalidateTag("articles", "hours");
  revalidatePath("/articles");
  revalidatePath("/");
}

export async function upsertArticle(
  id: number | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return fail("Butuh sesi admin. Silakan login ulang.");
  }

  const raw = Object.fromEntries(formData.entries());
  if (!raw.slug || (typeof raw.slug === "string" && raw.slug.trim() === "")) {
    raw.slug = slugify(String(raw.title ?? ""));
  }
  const parsed = articleSchema.safeParse(raw);
  if (!parsed.success) {
    return fail(
      "Periksa kembali isian form.",
      parsed.error.flatten().fieldErrors,
      formData,
    );
  }
  const data = parsed.data;

  try {
    const db = getDb();
    const clash = await db
      .select({ id: articles.id })
      .from(articles)
      .where(
        id === null
          ? eq(articles.slug, data.slug)
          : and(eq(articles.slug, data.slug), ne(articles.id, id)),
      )
      .limit(1);
    if (clash.length > 0) {
      return fail(
        "Slug sudah dipakai artikel lain. Ubah slug.",
        { slug: ["Slug sudah dipakai."] },
        formData,
      );
    }

    const values = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl || null,
      publicationStatus: data.publicationStatus,
      publishedAt: data.publicationStatus === "published" ? new Date() : null,
      updatedAt: new Date(),
    };
    if (id === null) {
      await db.insert(articles).values({ ...values, sortOrder: 99 });
    } else {
      await db.update(articles).set(values).where(eq(articles.id, id));
    }
    refresh();
    return {
      ok: true,
      message:
        data.publicationStatus === "published"
          ? "Artikel dipublikasikan."
          : "Draft artikel disimpan.",
    };
  } catch (error) {
    console.error("upsertArticle gagal:", error);
    return fail("Gagal menyimpan. Coba lagi.", undefined, formData);
  }
}

export async function deleteArticle(id: number): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Butuh sesi admin. Silakan login ulang." };
  }
  try {
    const db = getDb();
    await db.delete(articles).where(eq(articles.id, id));
    refresh();
    return { ok: true, message: "Artikel dihapus." };
  } catch (error) {
    console.error("deleteArticle gagal:", error);
    return { ok: false, message: "Gagal menghapus. Coba lagi." };
  }
}
