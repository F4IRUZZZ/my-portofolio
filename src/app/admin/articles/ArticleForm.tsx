"use client";

import { useActionState, useRef, useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { Markdown } from "@/components/ui/Markdown";
import { slugify } from "@/lib/validation";
import { upsertArticle, type ActionState } from "@/lib/actions/articles";
import type { AdminArticleRow } from "@/lib/admin-queries";
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

export function ArticleForm({ item }: { item?: AdminArticleRow }) {
  const bound = upsertArticle.bind(null, item?.id ?? null);
  const [state, formAction] = useActionState(bound, INITIAL);
  const titleRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(item?.content ?? "");

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

      <FormField id="title" label="Judul" required error={err(state, "title")}>
        <input
          ref={titleRef}
          id="title"
          name="title"
          required
          maxLength={160}
          defaultValue={val(state, item?.title, "title")}
          className={inputClass}
        />
      </FormField>

      <FormField
        id="slug"
        label="Slug"
        hint="Otomatis dari judul. Huruf kecil, angka, strip."
        error={err(state, "slug")}
      >
        <div className="flex gap-2">
          <input
            ref={slugRef}
            id="slug"
            name="slug"
            maxLength={160}
            placeholder="otomatis-dari-judul"
            defaultValue={val(state, item?.slug, "slug")}
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

      <FormField id="excerpt" label="Ringkasan" required error={err(state, "excerpt")}>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          maxLength={300}
          defaultValue={val(state, item?.excerpt, "excerpt")}
          className={inputClass}
        />
      </FormField>

      <FormField
        id="content"
        label="Isi (Markdown)"
        required
        hint="Mendukung heading, list, code block, quote, dan tautan. HTML mentah tidak dirender."
        error={err(state, "content")}
      >
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          defaultValue={val(state, item?.content, "content")}
          onChange={(event) => setPreview(event.target.value)}
          className={`${inputClass} font-mono`}
        />
      </FormField>

      {preview.trim() !== "" ? (
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Pratinjau</p>
          <div className="rounded-card border border-border bg-surface p-5">
            <Markdown content={preview} />
          </div>
        </div>
      ) : null}

      <FormField
        id="coverImageUrl"
        label="URL cover (opsional)"
        error={err(state, "coverImageUrl")}
      >
        <input
          id="coverImageUrl"
          name="coverImageUrl"
          type="url"
          placeholder="https://…"
          defaultValue={val(state, item?.coverImageUrl, "coverImageUrl")}
          className={inputClass}
        />
      </FormField>

      <SubmitButtons />
    </form>
  );
}
