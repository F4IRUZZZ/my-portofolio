"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

type DeleteButtonProps = {
  title: string;
  itemName: string;
  onDelete: () => Promise<{ ok: boolean; message: string }>;
};

export function DeleteButton({ title, itemName, onDelete }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function confirm() {
    setOpen(false);
    startTransition(async () => {
      const result = await onDelete();
      setMessage(result.message);
      if (result.ok) router.refresh();
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMessage(null);
          setOpen(true);
        }}
        aria-label={`Hapus ${itemName}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-border text-muted transition-colors duration-200 hover:border-danger hover:text-danger"
      >
        <Trash2 aria-hidden="true" className="h-4 w-4" />
      </button>
      <ConfirmDialog
        open={open}
        title={title}
        description={`"${itemName}" akan dihapus permanen dan tidak bisa dikembalikan.`}
        confirmLabel={pending ? "Menghapus…" : "Ya, hapus"}
        onConfirm={confirm}
        onClose={() => setOpen(false)}
      />
      {message ? (
        <p role="status" className="mt-3 text-sm text-muted">
          {message}
        </p>
      ) : null}
    </>
  );
}
