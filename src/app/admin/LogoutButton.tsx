"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => void signOut({ callbackUrl: "/" })}
      className="inline-flex items-center justify-center rounded-control border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-elevated"
    >
      Keluar
    </button>
  );
}
