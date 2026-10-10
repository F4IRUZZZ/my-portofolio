"use client";

import { useActionState, useRef, useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { slugify } from "@/lib/validation";
import { upsertProject, type ActionState } from "@/lib/actions/projects";
import type { AdminProjectDetail } from "@/lib/admin-queries";
import { SubmitButtons } from "../_components/SubmitButtons";

const INITIAL: ActionState = { ok: false, message: "" };

const inputClass =
  "rounded-control border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/70";

function fieldError(
  state: ActionState,
  name: string,
): string | undefined {
  return state.errors?.[name]?.[0];
}

function valueOf(
  state: ActionState,
  initial: string | undefined,
  name: string,
): string {
  return state.values?.[name] ?? initial ?? "";
}

export function ProjectForm({ project }: { project?: AdminProjectDetail }) {
  const bound = upsertProject.bind(null, project?.id ?? null);
  const [state, formAction] = useActionState(bound, INITIAL);
  const titleRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const [coverPreview, setCoverPreview] = useState(
    project?.coverImageUrl ?? "",
  );

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-5">
      {state.message ? (
        <p
          role={state.ok ? "status" : "alert"}
          className={`rounded-card border px-4 py-3 text-sm ${
            state.ok
              ? "border-success/40 bg-success/10 text-success"
              : "border-danger/40 bg-danger/10 text-danger"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <FormField id="title" label="Judul" required error={fieldError(state, "title")}>
        <input
          ref={titleRef}
          id="title"
          name="title"
          required
          maxLength={120}
          defaultValue={valueOf(state, project?.title, "title")}
          className={inputClass}
        />
      </FormField>

      <FormField
        id="slug"
        label="Slug"
        hint="Otomatis dari judul. Huruf kecil, angka, strip."
        error={fieldError(state, "slug")}
      >
        <div className="flex gap-2">
          <input
            ref={slugRef}
            id="slug"
            name="slug"
            maxLength={120}
            placeholder="otomatis-dari-judul"
            defaultValue={valueOf(state, project?.slug, "slug")}
            className={`${inputClass} flex-1`}
          />
          <button
            type="button"
            onClick={() => {
              if (titleRef.current && slugRef.current) {
                slugRef.current.value = slugify(titleRef.current.value);
              }
            }}
            className="shrink-0 rounded-control border border-border px-3 py-2 text-xs font-medium text-muted transition-colors duration-200 hover:text-foreground"
          >
            Buat dari judul
          </button>
        </div>
      </FormField>

      <FormField id="summary" label="Ringkasan" required error={fieldError(state, "summary")}>
        <textarea
          id="summary"
          name="summary"
          required
          rows={3}
          defaultValue={valueOf(state, project?.summary, "summary")}
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="category" label="Kategori" required error={fieldError(state, "category")}>
          <input
            id="category"
            name="category"
            required
            defaultValue={valueOf(state, project?.category, "category")}
            className={inputClass}
          />
        </FormField>
        <FormField id="role" label="Peran" required error={fieldError(state, "role")}>
          <input
            id="role"
            name="role"
            required
            defaultValue={valueOf(state, project?.role, "role")}
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField
        id="technologies"
        label="TechStack (pisahkan koma)"
        error={fieldError(state, "technologies")}
      >
        <input
          id="technologies"
          name="technologies"
          placeholder="PHP, CSS, MySQL"
          defaultValue={valueOf(state, project?.technologies.join(", "), "technologies")}
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="workStatus" label="Status pengerjaan" error={fieldError(state, "workStatus")}>
          <select
            id="workStatus"
            name="workStatus"
            defaultValue={valueOf(state, project?.workStatus, "workStatus") || "In Progress"}
            className={inputClass}
          >
            <option>In Progress</option>
            <option>Completed</option>
            <option>Archived</option>
          </select>
        </FormField>
        <FormField id="period" label="Periode (opsional)" error={fieldError(state, "period")}>
          <input
            id="period"
            name="period"
            maxLength={60}
            placeholder="Februari – April 2026"
            defaultValue={valueOf(state, project?.period ?? undefined, "period")}
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField
        id="coverUrl"
        label="URL cover (opsional)"
        hint="Tempel URL gambar langsung. Upload file ditunda ke tahap berikutnya."
        error={fieldError(state, "coverUrl")}
      >
        <input
          id="coverUrl"
          name="coverUrl"
          type="url"
          placeholder="https://…"
          defaultValue={valueOf(state, project?.coverImageUrl ?? undefined, "coverUrl")}
          onChange={(event) => setCoverPreview(event.target.value)}
          className={inputClass}
        />
      </FormField>
      {coverPreview.trim() !== "" ? (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverPreview}
            alt="Pratinjau cover"
            className="aspect-video w-full max-w-md rounded-card border border-border object-cover"
            onError={(event) => {
              (event.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="repositoryUrl" label="URL repository (opsional)" error={fieldError(state, "repositoryUrl")}>
          <input
            id="repositoryUrl"
            name="repositoryUrl"
            type="url"
            placeholder="https://…"
            defaultValue={valueOf(state, project?.repositoryUrl ?? undefined, "repositoryUrl")}
            className={inputClass}
          />
        </FormField>
        <FormField id="demoUrl" label="URL demo (opsional)" error={fieldError(state, "demoUrl")}>
          <input
            id="demoUrl"
            name="demoUrl"
            type="url"
            placeholder="https://…"
            defaultValue={valueOf(state, project?.demoUrl ?? undefined, "demoUrl")}
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField id="context" label="Konteks dan masalah" required error={fieldError(state, "context")}>
        <textarea
          id="context"
          name="context"
          required
          rows={3}
          defaultValue={valueOf(state, project?.context, "context")}
          className={inputClass}
        />
      </FormField>

      <FormField
        id="contributions"
        label="Kontribusi (satu per baris)"
        required
        error={fieldError(state, "contributions")}
      >
        <textarea
          id="contributions"
          name="contributions"
          required
          rows={4}
          defaultValue={valueOf(state, project?.contributions.join("\n"), "contributions")}
          className={inputClass}
        />
      </FormField>

      <FormField
        id="features"
        label="Fitur (satu per baris)"
        required
        error={fieldError(state, "features")}
      >
        <textarea
          id="features"
          name="features"
          required
          rows={3}
          defaultValue={valueOf(state, project?.features.join("\n"), "features")}
          className={inputClass}
        />
      </FormField>

      <FormField
        id="process"
        label="Proses (satu per baris)"
        required
        error={fieldError(state, "process")}
      >
        <textarea
          id="process"
          name="process"
          required
          rows={3}
          defaultValue={valueOf(state, project?.process.join("\n"), "process")}
          className={inputClass}
        />
      </FormField>

      <FormField id="challenges" label="Tantangan" required error={fieldError(state, "challenges")}>
        <textarea
          id="challenges"
          name="challenges"
          required
          rows={3}
          defaultValue={valueOf(state, project?.challenges, "challenges")}
          className={inputClass}
        />
      </FormField>

      <FormField id="learnings" label="Pembelajaran" required error={fieldError(state, "learnings")}>
        <textarea
          id="learnings"
          name="learnings"
          required
          rows={3}
          defaultValue={valueOf(state, project?.learnings, "learnings")}
          className={inputClass}
        />
      </FormField>

      <FormField id="currentState" label="Status saat ini dan keterbatasan" required error={fieldError(state, "currentState")}>
        <textarea
          id="currentState"
          name="currentState"
          required
          rows={3}
          defaultValue={valueOf(state, project?.currentState, "currentState")}
          className={inputClass}
        />
      </FormField>

      <label htmlFor="isFeatured" className="flex items-center gap-2 text-sm text-foreground">
        <input
          id="isFeatured"
          name="isFeatured"
          type="checkbox"
          value="on"
          defaultChecked={project?.isFeatured ?? false}
          className="h-4 w-4 accent-[#3B82F6]"
        />
        Tandai sebagai unggulan
      </label>

      <SubmitButtons />
    </form>
  );
}
