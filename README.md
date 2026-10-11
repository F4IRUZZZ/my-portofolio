# Fairuz.dev — Portofolio Student Developer

Website portofolio personal Alfairuz Atthariq Satria (kelas 12 RPL, SMKN 10 Surabaya)
dengan CMS privat. Lihat `PRD.md` dan `Design.md` untuk kebutuhan dan desain lengkap.

Bahasa utama konten: Bahasa Indonesia.

## TechStack

- Next.js 16 (App Router, cacheComponents) + React 19 + TypeScript 5
- Tailwind CSS v4 + ESLint 9
- Visual: Space Grotesk, JetBrains Mono, Lenis, React Three Fiber + Three.js
- Neon PostgreSQL + Drizzle ORM + Zod (Fase 3)
- Auth.js (next-auth v4 stabil) dengan login Google khusus admin (Fase 3)
- Package manager: npm

Belum dipasang: Cloudinary untuk media (gambar via URL manual, upload ditunda).

## Batasan keamanan yang diketahui

- Rate limiting khusus di endpoint auth **belum** dipasang. Mitigasi saat
  ini: throttling bawaan Google + allowlist 1 email + tanpa pendaftaran
  publik. Jangan klaim sebaliknya.

## Cara Menjalankan

```bash
npm install
cp .env.example .env.local
# isi DATABASE_URL (Neon pooled), AUTH_SECRET, GOOGLE_CLIENT_ID,
# GOOGLE_CLIENT_SECRET, ADMIN_EMAIL di .env.local
npm run dev
```

Buka http://localhost:3000. Login admin di http://localhost:3000/admin/login.

## Script

- `npm run dev` — development server
- `npm run lint` — cek ESLint
- `npx tsc --noEmit` — cek tipe
- `npm run build` — build production (butuh env database, lihat di bawah)
- `npm start` — jalankan hasil build
- `npm run db:generate` — buat migrasi dari schema (offline)
- `npm run db:migrate` — apply migrasi ke Neon (butuh `DATABASE_URL` di env)
- `npm run db:seed` — isi konten awal terverifikasi, aman dijalankan ulang
- `npm run db:studio` — buka Drizzle Studio

Catatan: `drizzle-kit`/`tsx` tidak membaca `.env.local` otomatis,
jadi untuk `db:migrate`/`db:seed` export dulu `DATABASE_URL` di shell.
`next dev`/`build` membaca `.env.local` sendiri.

## Migrasi Database

Drizzle + Neon (satu-satunya database, PRD §15.5). Migrasi SQL di `drizzle/`,
schema di `src/db/schema.ts`. Build production butuh `DATABASE_URL`
(env Vercel saat deploy). Jangan commit secret apa pun.

## Deployment (Vercel)

1. **Import repo** di https://vercel.com/new → pilih
   `F4IRUZZZ/my-portofolio` (framework terdeteksi Next.js otomatis).
2. **Environment Variables** (Production + Preview):
   `DATABASE_URL` (Neon pooled, project yang sama),
   `AUTH_SECRET` (generate baru, min 32 karakter, beda dari lokal),
   `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`,
   `ADMIN_EMAIL`, `NEXT_PUBLIC_SITE_URL` (URL production, mis.
   `https://fairuz-dev.vercel.app`).
3. **Google OAuth**: tambah Authorized redirect URI production
   `https://<domain>/api/auth/callback/google` di OAuth client
   (Google Cloud Console → Credentials).
4. **Database**: setelah deploy pertama, jalankan `db:migrate` ke Neon
   dari lokal (`DATABASE_URL` sudah menunjuk DB yang sama).
   **Jangan `db:seed`** bila DB sudah berisi konten CMS — seed
   menghapus dan menulis ulang.
5. Verifikasi: halaman 200, `/sitemap.xml`, `/robots.txt`, OG image,
   `/admin` tanpa sesi redirect ke login, login Google end-to-end.

Jangan commit secret apa pun.

## Status Fase

- [x] Fase 0 — Scaffolding
- [x] Fase 1 — Design token + komponen reusable
- [x] Fase 2 — Halaman publik P0
- [x] Fase 3 — Database + Auth
- [x] Fase 4 — CMS admin
- [x] Fase 5 — SEO, hardening, docs, deploy (PR, menunggu review)
