# Fairuz.dev — Portofolio Student Developer

Website portofolio personal Alfairuz Atthariq Satria (kelas 12 RPL, SMKN 10 Surabaya)
dengan CMS privat. Lihat `PRD.md` dan `Design.md` untuk kebutuhan dan desain lengkap.

Bahasa utama konten: Bahasa Indonesia.

## TechStack

- Next.js 16 (App Router, cacheComponents) + React 19 + TypeScript 5
- Tailwind CSS v4 + ESLint 9
- Neon PostgreSQL + Drizzle ORM + Zod (Fase 3)
- Auth.js (next-auth v4 stabil) dengan login Google khusus admin (Fase 3)
- Package manager: npm

Belum dipasang (Fase 4+): Cloudinary untuk media.

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

## Deployment

Rencana: Vercel (aplikasi) + Neon (database) + Cloudinary (media).
Detail menyusul setelah Fase 3. Jangan commit secret apa pun.

## Status Fase

- [x] Fase 0 — Scaffolding
- [x] Fase 1 — Design token + komponen reusable
- [x] Fase 2 — Halaman publik P0
- [x] Fase 3 — Database + Auth (PR, menunggu review)
- [ ] Fase 4 — CMS admin
- [ ] Fase 5 — SEO + hardening + docs akhir
