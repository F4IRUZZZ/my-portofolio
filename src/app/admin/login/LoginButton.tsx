"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        void signIn("google", { callbackUrl: "/admin" });
      }}
      className="inline-flex w-full items-center justify-center gap-2 rounded-control bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Membuka Google…" : "Masuk dengan Google"}
    </button>
  );
}
