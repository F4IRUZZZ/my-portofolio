import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getServerEnv } from "./env";

/*
 * Auth.js (next-auth v4, API stabil — alasan: v5 masih beta di npm `latest`,
 * API v4 terdokumentasi penuh dan cukup untuk 1 admin).
 * Satu-satunya jalan masuk CMS adalah login Google dengan email allowlist.
 * Session JWT: tidak ada tabel session di database.
 */
export function getAuthOptions(): NextAuthOptions {
  const env = getServerEnv();
  const allowedEmail = env.ADMIN_EMAIL.toLowerCase();

  return {
    secret: env.AUTH_SECRET,
    session: { strategy: "jwt" },
    pages: { signIn: "/admin/login" },
    providers: [
      GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async signIn({ user }) {
        // Pesan penolakan dibuat generik di halaman login (AccessDenied)
        // agar tidak membocorkan email mana yang terdaftar.
        return user.email?.toLowerCase() === allowedEmail;
      },
    },
  };
}
