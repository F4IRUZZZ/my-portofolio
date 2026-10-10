"use client";

import { useActionState } from "react";
import { FormField } from "@/components/ui/FormField";
import { upsertProfile, type ActionState } from "@/lib/actions/profile";
import type { AdminProfile } from "@/lib/admin-queries";

const INITIAL: ActionState = { ok: false, message: "" };

const inputClass =
  "rounded-control border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/70";

function err(state: ActionState, name: string): string | undefined {
  return state.errors?.[name]?.[0];
}

function val(
  state: ActionState,
  initial: string | string[] | null | undefined,
  name: string,
): string {
  if (state.values?.[name] !== undefined) return state.values[name];
  if (Array.isArray(initial)) return initial.join("\n");
  return initial ?? "";
}

export function ProfileForm({ profile }: { profile: AdminProfile }) {
  const [state, formAction] = useActionState(upsertProfile, INITIAL);

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

      <FormField id="fullName" label="Nama lengkap" required error={err(state, "fullName")}>
        <input id="fullName" name="fullName" required defaultValue={val(state, profile?.fullName, "fullName")} className={inputClass} />
      </FormField>

      <FormField id="headline" label="Headline" required error={err(state, "headline")}>
        <input id="headline" name="headline" required defaultValue={val(state, profile?.headline, "headline")} className={inputClass} />
      </FormField>

      <FormField id="bio" label="Bio (satu paragraf per baris kosong)" required error={err(state, "bio")}>
        <textarea id="bio" name="bio" required rows={6} defaultValue={val(state, profile?.bio, "bio")} className={inputClass} />
      </FormField>

      <FormField id="education" label="Pendidikan" required error={err(state, "education")}>
        <input id="education" name="education" required defaultValue={val(state, profile?.education, "education")} className={inputClass} />
      </FormField>

      <FormField id="publicEmail" label="Email publik (opsional)" error={err(state, "publicEmail")}>
        <input id="publicEmail" name="publicEmail" type="email" defaultValue={val(state, profile?.publicEmail, "publicEmail")} className={inputClass} />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="githubUrl" label="GitHub (opsional)" error={err(state, "githubUrl")}>
          <input id="githubUrl" name="githubUrl" type="url" placeholder="https://…" defaultValue={val(state, profile?.githubUrl, "githubUrl")} className={inputClass} />
        </FormField>
        <FormField id="linkedinUrl" label="LinkedIn (opsional)" error={err(state, "linkedinUrl")}>
          <input id="linkedinUrl" name="linkedinUrl" type="url" placeholder="https://…" defaultValue={val(state, profile?.linkedinUrl, "linkedinUrl")} className={inputClass} />
        </FormField>
      </div>

      <FormField
        id="cvUrl"
        label="URL CV (opsional)"
        hint="Kosongkan bila belum ada — tautan CV tidak ditampilkan."
        error={err(state, "cvUrl")}
      >
        <input id="cvUrl" name="cvUrl" type="url" placeholder="https://…" defaultValue={val(state, profile?.cvUrl, "cvUrl")} className={inputClass} />
      </FormField>

      <div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-control bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          Simpan Profil
        </button>
      </div>
    </form>
  );
}
