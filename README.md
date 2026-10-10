# Fairuz.dev — Portofolio Student Developer

Website portofolio personal Alfairuz Atthariq Satria (kelas 12 RPL, SMKN 10 Surabaya)
dengan CMS privat. Lihat `PRD.md` dan `Design.md` untuk kebutuhan dan desain lengkap.

Bahasa utama konten: Bahasa Indonesia.

## TechStack (Fase 0)

- Next.js 16 (App Router) + React 19 + TypeScript 5
- Tailwind CSS v4 + ESLint 9
- Package manager: npm

P1+ (belum dipasang di Fase 0): Neon PostgreSQL + Drizzle ORM + Zod + Auth.js + Cloudinary.

## Cara Menjalankan

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka http://localhost:3000.

## Script

- `npm run dev` — development server
- `npm run lint` — cek ESLint
- `npx tsc --noEmit` — cek tipe
- `npm run build` — build production
- `npm start` — jalankan hasil build

## Migrasi Database

Belum ada di Fase 0. Baru tersedia mulai Fase 3 (Drizzle + Neon).
Jangan menambahkan database kedua tanpa persetujuan (PRD §15.5).

## Deployment

Rencana: Vercel (aplikasi) + Neon (database) + Cloudinary (media).
Detail menyusul setelah Fase 3. Jangan commit secret apa pun.

## Status Fase

- [x] Fase 0 — Scaffolding (fondasi build hijau + placeholder jujur)
- [ ] Fase 1 — Design token + komponen reusable
- [ ] Fase 2 — Halaman publik P0
- [ ] Fase 3 — Database + Auth
- [ ] Fase 4 — CMS admin
- [ ] Fase 5 — SEO + hardening + docs akhir
