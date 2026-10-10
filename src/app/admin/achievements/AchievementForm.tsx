"use client";

import { useActionState } from "react";
import { FormField } from "@/components/ui/FormField";
import { upsertAchievement, type ActionState } from "@/lib/actions/achievements";
import type { AdminAchievementRow } from "@/lib/admin-queries";
import { SubmitButtons } from "../_components/SubmitButtons";

const INITIAL: ActionState = { ok: false, message: "" };

const inputClass =
  "rounded-control border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/70";

function err(state: ActionState, name: string): string | undefined {
  return state.errors?.[name]?.[0];
}

function val(
  state: ActionState,
  initial: string | null | undefined,
  name: string,
): string {
  return state.values?.[name] ?? initial ?? "";
}

export function AchievementForm({ item }: { item?: AdminAchievementRow }) {
  const bound = upsertAchievement.bind(null, item?.id ?? null);
  const [state, formAction] = useActionState(bound, INITIAL);

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

      <FormField id="title" label="Judul prestasi" required error={err(state, "title")}>
        <input id="title" name="title" required defaultValue={val(state, item?.title, "title")} className={inputClass} />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="rank" label="Peringkat" required error={err(state, "rank")}>
          <input id="rank" name="rank" required placeholder="Juara 3" defaultValue={val(state, item?.rank, "rank")} className={inputClass} />
        </FormField>
        <FormField id="category" label="Bidang/Kategori" required error={err(state, "category")}>
          <input id="category" name="category" required defaultValue={val(state, item?.category, "category")} className={inputClass} />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="organizer" label="Penyelenggara/Tingkat" required error={err(state, "organizer")}>
          <input id="organizer" name="organizer" required defaultValue={val(state, item?.organizer, "organizer")} className={inputClass} />
        </FormField>
        <FormField id="location" label="Lokasi" required error={err(state, "location")}>
          <input id="location" name="location" required defaultValue={val(state, item?.location, "location")} className={inputClass} />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="competedAt" label="Tanggal lomba (opsional)" error={err(state, "competedAt")}>
          <input id="competedAt" name="competedAt" type="date" defaultValue={val(state, item?.competedAt, "competedAt")} className={inputClass} />
        </FormField>
        <FormField id="announcedAt" label="Tanggal pengumuman (opsional)" error={err(state, "announcedAt")}>
          <input id="announcedAt" name="announcedAt" type="date" defaultValue={val(state, item?.announcedAt, "announcedAt")} className={inputClass} />
        </FormField>
      </div>

      <FormField id="description" label="Deskripsi" required error={err(state, "description")}>
        <textarea id="description" name="description" required rows={4} defaultValue={val(state, item?.description, "description")} className={inputClass} />
      </FormField>

      <FormField id="evidenceUrl" label="URL bukti (opsional)" error={err(state, "evidenceUrl")}>
        <input id="evidenceUrl" name="evidenceUrl" type="url" placeholder="https://…" defaultValue={val(state, item?.evidenceUrl, "evidenceUrl")} className={inputClass} />
      </FormField>

      <SubmitButtons />
    </form>
  );
}
