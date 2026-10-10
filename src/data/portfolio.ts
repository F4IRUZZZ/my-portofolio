/*
 * INTERIM — data statis sementara sampai CMS Fase 3/4.
 * Aturan: hanya fakta dari PRD/Design + data terverifikasi pemilik
 * (10 Okt 2026). Tidak ada tanggal, metrik, hasil, atau tautan karangan.
 * Saat CMS jadi, file ini diganti sumber database tanpa mengubah komponen.
 */

import type { WorkStatus } from "@/components/ui/StatusBadge";

export const profile = {
  fullName: "Alfairuz Atthariq Satria",
  headline: "Student Developer",
  tagline:
    "Saya Fairuz, Student Developer yang membangun solusi digital melalui kode dan desain.",
  subTagline:
    "Siswa kelas 12 Rekayasa Perangkat Lunak di SMK Negeri 10 Surabaya. Tertarik pada pengembangan web, aplikasi, dan eksplorasi teknologi.",
  education: "SMK Negeri 10 Surabaya — Rekayasa Perangkat Lunak (kelas 12)",
  bio: [
    "Saya Alfairuz Atthariq Satria, siswa kelas 12 jurusan Rekayasa Perangkat Lunak di SMK Negeri 10 Surabaya yang sedang membangun rekam jejak sebagai developer.",
    "Saya mempelajari PHP, CSS, dan JavaScript dasar, CRUD dengan PHP, UI/UX dengan Figma, ERD dengan draw.io, serta aplikasi desktop Python dengan CustomTkinter. Saat ini saya mengembangkan kemampuan web modern melalui proyek PKL menggunakan Next.js, React, dan Tailwind CSS.",
  ],
  interests: [
    "Pengembangan web",
    "Aplikasi desktop",
    "UI/UX dan desain konten",
    "Eksplorasi teknologi (AI, IoT)",
  ],
  publicEmail: "alafairuzatthariqs@gmail.com",
  githubUrl: "https://github.com/F4IRUZZZ",
  linkedinUrl: "https://www.linkedin.com/in/fairuzzz-undefined-646466419/",
  cvUrl: null as string | null,
};

export const techStacks = {
  used: [
    "PHP",
    "CSS",
    "JavaScript dasar",
    "Python",
    "CustomTkinter",
    "Figma",
    "draw.io",
    "Canva",
    "MySQL",
  ],
  developing: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  role: string;
  technologies: string[];
  workStatus: WorkStatus;
  isFeatured: boolean;
  period: string;
  context: string;
  contributions: string[];
  features: string[];
  process: string[];
  challenges: string;
  learnings: string;
  currentState: string;
  repositoryUrl: string | null;
  demoUrl: string | null;
};

export const projects: Project[] = [
  {
    slug: "sistem-layanan-ktm-hilang",
    title: "Website Layanan Pengurusan KTM Hilang",
    summary:
      "Website layanan pengurusan KTM hilang yang dikembangkan selama PKL di ITS menggunakan PHP dengan pola MVC. Proyek ini mencakup modul pelaporan dan pengelolaan oleh admin, dengan status akhir yang masih dalam pengembangan karena keterbatasan waktu PKL.",
    category: "Web Development",
    role: "Student Developer (PKL)",
    technologies: ["PHP", "CSS", "MySQL", "MVC"],
    workStatus: "In Progress",
    isFeatured: true,
    period: "Februari – April 2026",
    context:
      "Dikerjakan menjelang akhir periode PKL di Direktorat Pendidikan Sarjana & Pascasarjana ITS sebagai proyek website layanan untuk pengurusan KTM hilang oleh mahasiswa.",
    contributions: [
      "Membantu pengembangan website layanan KTM hilang dengan PHP berpola MVC.",
      "Struktur kode arsip mencakup controller, model, middleware autentikasi, view, dan skrip SQL.",
    ],
    features: [
      "Area modul yang terlihat dari arsip: laporan KTM, pengecekan status, dashboard admin, pengelolaan akun, dan rekap. Perilaku setiap fitur belum terverifikasi satu per satu, sehingga tidak diklaim semuanya berfungsi.",
    ],
    process: [
      "Mempelajari alur layanan pengurusan KTM hilang yang dibutuhkan direktorat.",
      "Mengembangkan modul mengikuti pola MVC yang sudah ada di arsip proyek.",
    ],
    challenges:
      "Waktu PKL terbatas karena proyek diberikan menjelang akhir periode, sehingga tidak semua modul sempat diselesaikan dan diverifikasi.",
    learnings:
      "Pola MVC pada aplikasi PHP, pemisahan controller–model–view, dan pentingnya memverifikasi fitur sebelum menyatakan berfungsi.",
    currentState:
      "Belum tuntas ketika periode PKL berakhir. Dipublikasikan apa adanya sebagai arsip pembelajaran.",
    repositoryUrl: null,
    demoUrl: null,
  },
  {
    slug: "website-cms-konsultasi",
    title: "Website CMS Artikel dan Layanan Konsultasi",
    summary:
      "Website dengan CMS artikel dan layanan konsultasi yang dikerjakan selama PKL di PT Daksa Consultant Indonesia menggunakan Next.js, React, dan Tailwind CSS. Database masih dalam tahap penentuan dan proyek berstatus dalam pengerjaan.",
    category: "Web Development",
    role: "Student Developer (PKL)",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    workStatus: "In Progress",
    isFeatured: true,
    period: "Juli – Oktober 2026",
    context:
      "Proyek website perusahaan dengan kebutuhan CMS artikel dan layanan konsultasi. Pekerjaan website dimulai setelah masa awal PKL yang diisi desain konten Instagram menggunakan Canva — keduanya dicatat terpisah.",
    contributions: [
      "Mengerjakan website CMS artikel dan layanan konsultasi dengan Next.js, React, dan Tailwind CSS.",
      "Pekerjaan desain konten Instagram dengan Canva dicatat sebagai kontribusi terpisah, bukan bagian proyek website.",
    ],
    features: [
      "Rencana fitur: CMS artikel dan layanan konsultasi. Implementasi masih berjalan dan database masih dalam tahap penentuan, sehingga rincian fitur belum dapat dipublikasikan.",
    ],
    process: [
      "Mempelajari Next.js, React, dan Tailwind CSS langsung melalui proyek berjalan.",
      "Menentukan struktur CMS artikel mengikuti kebutuhan perusahaan.",
    ],
    challenges:
      "Teknologi baru yang dipelajari sambil mengerjakan, ditambah keputusan database yang belum final saat pengembangan berjalan.",
    learnings:
      "Dasar pengembangan web modern dengan Next.js dan Tailwind CSS, serta cara memisahkan pekerjaan desain konten dari pengembangan website.",
    currentState:
      "Dalam pengerjaan. Hanya informasi dan aset yang telah mendapat izin yang dipublikasikan.",
    repositoryUrl: null,
    demoUrl: null,
  },
];

export const achievement = {
  rank: "Juara 3",
  title: "Lomba Kompetensi Siswa (LKS) bidang Artificial Intelligence",
  scope: "Tingkat Kota Surabaya",
  location: "SMK Negeri 1 Surabaya",
  competedAt: "9 Februari 2026",
  announcedAt: "11 Februari 2026",
  description:
    "Meraih Juara 3 LKS tingkat Kota Surabaya bidang Artificial Intelligence. Lomba dilaksanakan pada 9 Februari 2026 di SMK Negeri 1 Surabaya, dengan pengumuman juara serta penyerahan sertifikat dan piala pada 11 Februari.",
};

export type Experience = {
  organization: string;
  role: string;
  period: string;
  summary: string;
  contributions: string[];
  technologies: string[];
  relatedProjectHref?: string;
  relatedProjectLabel?: string;
};

export const experiences: Experience[] = [
  {
    organization: "Institut Teknologi Sepuluh Nopember (ITS)",
    role: "PKL — Direktorat Pendidikan Sarjana & Pascasarjana",
    period: "2 Februari – 30 April 2026",
    summary:
      "Mendukung layanan mahasiswa pada masa awal PKL, kemudian mengerjakan proyek website layanan pengurusan KTM hilang menjelang akhir periode.",
    contributions: [
      "Dukungan layanan mahasiswa (tugas operasional, bukan coding).",
      "Kontribusi pada proyek website layanan KTM hilang dengan PHP berpola MVC — dicatat terpisah dari tugas layanan.",
    ],
    technologies: ["PHP", "CSS", "MySQL", "MVC"],
    relatedProjectHref: "/projects/sistem-layanan-ktm-hilang",
    relatedProjectLabel: "Lihat proyek KTM",
  },
  {
    organization: "PT Daksa Consultant Indonesia",
    role: "PKL — Student Developer",
    period: "27 Juli – 17 Oktober 2026",
    summary:
      "Mengawali PKL dengan desain konten Instagram menggunakan Canva, kemudian mengerjakan proyek website dengan CMS artikel dan layanan konsultasi.",
    contributions: [
      "Desain konten Instagram menggunakan Canva (pekerjaan desain, bukan coding).",
      "Pengembangan website CMS artikel dan layanan konsultasi dengan Next.js, React, dan Tailwind CSS.",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Canva"],
    relatedProjectHref: "/projects/website-cms-konsultasi",
    relatedProjectLabel: "Lihat proyek website",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string): Project[] {
  return projects.filter((project) => project.slug !== slug);
}
