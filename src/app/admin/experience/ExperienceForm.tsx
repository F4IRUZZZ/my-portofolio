"use client";

import { useActionState } from "react";
import { FormField } from "@/components/ui/FormField";
import { upsertExperience, type ActionState } from "@/lib/actions/experiences";
import type { AdminExperienceRow } from "@/lib/admin-queries";
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

export function ExperienceForm({ item }: { item?: AdminExperienceRow }) {
  const bound = upsertExperience.bind(null, item?.id ?? null);
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

      <FormField id="organization" label="Organisasi" required error={err(state, "organization")}>
        <input id="organization" name="organization" required defaultValue={val(state, item?.organization, "organization")} className={inputClass} />
      </FormField>

      <FormField id="role" label="Peran/Posisi" required error={err(state, "role")}>
        <input id="role" name="role" required defaultValue={val(state, item?.role, "role")} className={inputClass} />
      </FormField>

      <FormField id="location" label="Lokasi (opsional)" error={err(state, "location")}>
        <input id="location" name="location" defaultValue={val(state, item?.location, "location")} className={inputClass} />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="startDate" label="Tanggal mulai (opsional)" error={err(state, "startDate")}>
          <input id="startDate" name="startDate" type="date" defaultValue={val(state, item?.startDate, "startDate")} className={inputClass} />
        </FormField>
        <FormField id="endDate" label="Tanggal selesai (opsional)" error={err(state, "endDate")}>
          <input id="endDate" name="endDate" type="date" defaultValue={val(state, item?.endDate, "endDate")} className={inputClass} />
        </FormField>
      </div>

      <FormField id="summary" label="Ringkasan" required error={err(state, "summary")}>
        <textarea id="summary" name="summary" required rows={3} defaultValue={val(state, item?.summary, "summary")} className={inputClass} />
      </FormField>

      <FormField
        id="responsibilities"
        label="Tanggung jawab (satu per baris)"
        required
        error={err(state, "responsibilities")}
      >
        <textarea
          id="responsibilities"
          name="responsibilities"
          required
          rows={4}
          defaultValue={val(state, item?.responsibilities.join("\n"), "responsibilities")}
          className={inputClass}
        />
      </FormField>

      <FormField id="technologies" label="Teknologi (pisahkan koma)" error={err(state, "technologies")}>
        <input
          id="technologies"
          name="technologies"
          defaultValue={val(state, item?.technologies.join(", "), "technologies")}
          className={inputClass}
        />
      </FormField>

      <FormField
        id="relatedProjectSlug"
        label="Slug proyek terkait (opsional)"
        hint="Cth: sistem-layanan-ktm-hilang. Kosongkan bila tidak ada."
        error={err(state, "relatedProjectSlug")}
      >
        <input id="relatedProjectSlug" name="relatedProjectSlug" defaultValue={val(state, item?.relatedProjectSlug, "relatedProjectSlug")} className={inputClass} />
      </FormField>

      <FormField
        id="evidenceUrl"
        label="URL bukti (opsional)"
        hint="Cth: /documents/sertifikat-pkl-its-2026.jpg. Kosongkan bila tidak ada."
        error={err(state, "evidenceUrl")}
      >
        <input id="evidenceUrl" name="evidenceUrl" defaultValue={val(state, item?.evidenceUrl, "evidenceUrl")} placeholder="/documents/… atau https://…" className={inputClass} />
      </FormField>

      <SubmitButtons />
    </form>
  );
}
