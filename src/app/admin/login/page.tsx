import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAuthOptions } from "@/lib/auth";
import { GoogleLoginButton } from "./LoginButton";

export const metadata: Metadata = {
  title: "Login Admin — Fairuz.dev",
  description: "Masuk ke dashboard CMS Fairuz.dev.",
};

const ERROR_MESSAGES: Record<string, string> = {
  AccessDenied: "Akun ini tidak memiliki akses admin.",
  default: "Gagal masuk. Silakan coba lagi.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getServerSession(getAuthOptions());
  if (session) redirect("/admin");

  const { error } = await searchParams;
  const message = error ? (ERROR_MESSAGES[error] ?? ERROR_MESSAGES.default) : null;

  return (
    <div className="mx-auto max-w-md">
      <SectionHeading
        level={1}
        eyebrow="Area privat"
        title="Login Admin"
        description="Hanya pemilik yang dapat masuk ke dashboard CMS."
      />
      <div className="mt-8 rounded-card border border-border bg-surface p-5 sm:p-6">
        {message ? (
          <p role="alert" className="mb-4 text-sm font-medium text-danger">
            {message}
          </p>
        ) : null}
        <GoogleLoginButton />
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Login memakai akun Google yang terdaftar sebagai admin. Akun lain
          otomatis ditolak.
        </p>
      </div>
    </div>
  );
}
