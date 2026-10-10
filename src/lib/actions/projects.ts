"use server";

import { and, eq, ne } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { getDb } from "@/db";
import { projectTechnologies, projects } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-queries";
import { projectSchema, slugify } from "@/lib/validation";

export type ActionState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]>;
  values?: Record<string, string>;
};

function keepValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") values[key] = value;
  }
  return values;
}

function fail(
  message: string,
  errors?: Record<string, string[]>,
  formData?: FormData,
): ActionState {
  return { ok: false, message, errors, values: formData ? keepValues(formData) : undefined };
}

export async function upsertProject(
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
  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return fail("Periksa kembali isian form.", parsed.error.flatten().fieldErrors, formData);
  }
  const data = parsed.data;

  try {
    const db = getDb();
    const clash = await db
      .select({ id: projects.id })
      .from(projects)
      .where(
        id === null
          ? eq(projects.slug, data.slug)
          : and(eq(projects.slug, data.slug), ne(projects.id, id)),
      )
      .limit(1);
    if (clash.length > 0) {
      return fail("Slug sudah dipakai proyek lain. Ubah slug.", { slug: ["Slug sudah dipakai."] }, formData);
    }

    const values = {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      category: data.category,
      role: data.role,
      workStatus: data.workStatus,
      isFeatured: data.isFeatured === "on",
      publicationStatus: data.publicationStatus,
      period: data.period || null,
      repositoryUrl: data.repositoryUrl || null,
      demoUrl: data.demoUrl || null,
      coverImageUrl: data.coverUrl || null,
      context: data.context,
      contributions: data.contributions,
      features: data.features,
      process: data.process,
      challenges: data.challenges,
      learnings: data.learnings,
      currentState: data.currentState,
      publishedAt: data.publicationStatus === "published" ? new Date() : null,
      updatedAt: new Date(),
    };

    let projectId = id;
    if (id === null) {
      const inserted = await db
        .insert(projects)
        .values({ ...values, sortOrder: 99 })
        .returning({ id: projects.id });
      projectId = inserted[0].id;
    } else {
      await db.update(projects).set(values).where(eq(projects.id, id));
      await db
        .delete(projectTechnologies)
        .where(eq(projectTechnologies.projectId, id));
    }
    if (data.technologies.length > 0 && projectId !== null) {
      await db.insert(projectTechnologies).values(
        data.technologies.map((technologyName) => ({
          projectId: projectId as number,
          technologyName,
        })),
      );
    }

    revalidateTag("projects", "hours");
    revalidatePath("/projects");
    revalidatePath("/");
    return {
      ok: true,
      message:
        data.publicationStatus === "published"
          ? "Proyek dipublikasikan."
          : "Draft proyek disimpan.",
    };
  } catch (error) {
    console.error("upsertProject gagal:", error);
    return fail("Gagal menyimpan. Coba lagi.", undefined, formData);
  }
}

export async function deleteProject(id: number): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Butuh sesi admin. Silakan login ulang." };
  }
  try {
    const db = getDb();
    await db.delete(projects).where(eq(projects.id, id));
    revalidateTag("projects", "hours");
    revalidatePath("/projects");
    revalidatePath("/");
    return { ok: true, message: "Proyek dihapus." };
  } catch (error) {
    console.error("deleteProject gagal:", error);
    return { ok: false, message: "Gagal menghapus. Coba lagi." };
  }
}
