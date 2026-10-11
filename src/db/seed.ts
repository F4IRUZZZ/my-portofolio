/*
 * Seed awal: konten terverifikasi pemilik (10 Okt 2026), sama persis dengan
 * data interim Fase 2. Semua konten langsung published. Aman dijalankan
 * ulang: membersihkan tabel terlebih dahulu dalam satu transaksi.
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  achievements,
  experiences,
  profiles,
  projectTechnologies,
  projects,
} from "./schema";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL wajib diisi untuk seeding");
  const db = drizzle(neon(databaseUrl));

  const now = new Date();
  const publishedAt = now;

  // neon-http tidak mendukung transaksi: jalankan sekuensial.
  // Aman dijalankan ulang karena tabel dibersihkan terlebih dahulu.
  await db.delete(projectTechnologies);
  await db.delete(projects);
  await db.delete(achievements);
  await db.delete(experiences);
  await db.delete(profiles);

  await db.insert(profiles).values({
    fullName: "Alfairuz Atthariq Satria",
    headline: "Student Developer",
      bio: [
        "Saya Alfairuz Atthariq Satria, siswa kelas 12 jurusan Rekayasa Perangkat Lunak di SMK Negeri 10 Surabaya yang sedang membangun rekam jejak sebagai developer.",
        "Saya mempelajari PHP, CSS, dan JavaScript dasar, CRUD dengan PHP, UI/UX dengan Figma, ERD dengan draw.io, serta aplikasi desktop Python dengan CustomTkinter. Saya juga sempat mempelajari Qt Designer. Saat ini saya mengembangkan kemampuan web modern melalui proyek PKL menggunakan Next.js, React, dan Tailwind CSS.",
      ],
    education:
      "SMK Negeri 10 Surabaya — Rekayasa Perangkat Lunak (kelas 12)",
    publicEmail: "alafairuzatthariqs@gmail.com",
    githubUrl: "https://github.com/F4IRUZZZ",
    linkedinUrl:
      "https://www.linkedin.com/in/fairuzzz-undefined-646466419/",
    cvUrl: null,
  });

  const insertedProjects = await db
    .insert(projects)
    .values([
        {
          title: "Website Layanan Pengurusan KTM Hilang",
          slug: "sistem-layanan-ktm-hilang",
          summary:
            "Website layanan pengurusan KTM hilang yang dikembangkan selama PKL di ITS menggunakan PHP dengan pola MVC. Proyek ini mencakup modul pelaporan dan pengelolaan oleh admin, dengan status akhir yang masih dalam pengembangan karena keterbatasan waktu PKL.",
          category: "Web Development",
          role: "Student Developer (PKL)",
          workStatus: "In Progress",
          isFeatured: true,
          publicationStatus: "published",
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
          coverImageUrl: "/documents/ktm-pengganti-beranda.jpg",
          sortOrder: 1,
          publishedAt,
        },
        {
          title: "Website CMS Artikel dan Layanan Konsultasi",
          slug: "website-cms-konsultasi",
          summary:
            "Website dengan CMS artikel dan layanan konsultasi yang dikerjakan selama PKL di PT Daksa Consultant Indonesia menggunakan Next.js, React, dan Tailwind CSS. Database masih dalam tahap penentuan dan proyek berstatus dalam pengerjaan.",
          category: "Web Development",
          role: "Student Developer (PKL)",
          workStatus: "In Progress",
          isFeatured: true,
          publicationStatus: "published",
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
          coverImageUrl: "/documents/konsultasi-izinsatset.jpg",
          sortOrder: 2,
          publishedAt,
        },
        {
          title: "FamVault — Webapp Pencatat Keuangan",
          slug: "famvault-pencatat-keuangan",
          summary:
            "Aplikasi web pencatat keuangan pribadi dengan dashboard, transaksi, hutang, riwayat, dan grafik pengeluaran per kategori. Status dalam pengerjaan: kurang fitur login dan perbaikan beberapa bug.",
          category: "Web Development",
          role: "Student Developer (proyek pribadi)",
          workStatus: "In Progress",
          isFeatured: true,
          publicationStatus: "published",
          period: null,
          context:
            "Proyek pribadi untuk belajar membangun aplikasi web modern: dashboard keuangan dengan ringkasan masuk/keluar, saldo per periode, pencatatan transaksi dan hutang, serta grafik pengeluaran per kategori.",
          contributions: [
            "Membangun dashboard, halaman transaksi, hutang, riwayat, dan pengaturan dengan Next.js dan Tailwind CSS.",
            "Mengembangkan fitur grafik pengeluaran per kategori dan filter periode Minggu/Bulan/Semua Waktu.",
          ],
          features: [
            "Area fitur yang terlihat: dashboard ringkasan, transaksi masuk/keluar, bayar hutang, filter periode, grafik per kategori, dan riwayat. Masih ada bug yang sedang diperbaiki dan fitur login belum tersedia.",
          ],
          process: [
            "Merancang alur pencatatan keuangan sederhana sebelum mengimplementasikan tampilan.",
            "Mengembangkan antarmuka gelap yang konsisten antar halaman.",
          ],
          challenges:
            "Menyeimbangkan kelengkapan fitur dengan kualitas kode sambil memperbaiki bug yang ditemukan selama pengembangan.",
          learnings:
            "Pengelolaan state, pemodelan data transaksi dan hutang, serta pentingnya autentikasi sebelum data sensitif disimpan.",
          currentState:
            "Dalam pengerjaan: kurang fitur login dan perbaikan beberapa bug. Screenshot menampilkan data kosong (tanpa data keuangan asli).",
          repositoryUrl: "https://github.com/F4IRUZZZ/keuangan-next",
          demoUrl: null,
          coverImageUrl: "/documents/famvault-dashboard.jpg",
          sortOrder: 3,
          publishedAt,
        },
      ])
      .returning({ id: projects.id, slug: projects.slug });

    const techBySlug: Record<string, string[]> = {
      "sistem-layanan-ktm-hilang": ["PHP", "CSS", "MySQL", "MVC"],
      "website-cms-konsultasi": ["Next.js", "React", "Tailwind CSS"],
      "famvault-pencatat-keuangan": ["Next.js", "Tailwind CSS"],
    };
    for (const row of insertedProjects) {
      const techs = techBySlug[row.slug] ?? [];
      if (techs.length > 0) {
        await db.insert(projectTechnologies).values(
          techs.map((technologyName) => ({
            projectId: row.id,
            technologyName,
          })),
        );
      }
    }

    await db.insert(achievements).values({
      title: "Lomba Kompetensi Siswa (LKS) bidang Artificial Intelligence",
      organizer: "Tingkat Kota Surabaya",
      category: "Artificial Intelligence",
      rank: "Juara 3",
      location: "SMK Negeri 1 Surabaya",
      competedAt: "2026-02-09",
      announcedAt: "2026-02-11",
      description:
        "Meraih Juara 3 LKS tingkat Kota Surabaya bidang Artificial Intelligence. Diselenggarakan oleh MKKS Kota Surabaya pada 9–11 Februari 2026 sesuai piagam penghargaan.",
      evidenceUrl: "/documents/piagam-lks-2026.jpg",
      publicationStatus: "published",
      sortOrder: 1,
    });

    await db.insert(experiences).values([
      {
        organization: "Institut Teknologi Sepuluh Nopember (ITS)",
        role: "PKL — Direktorat Pendidikan Sarjana & Pascasarjana",
        startDate: "2026-02-02",
        endDate: "2026-04-30",
        summary:
          "Mendukung layanan mahasiswa pada masa awal PKL, kemudian mengerjakan proyek website layanan pengurusan KTM hilang menjelang akhir periode.",
        responsibilities: [
          "Dukungan layanan mahasiswa (tugas operasional, bukan coding): layanan customer/mahasiswa, surat keterangan mahasiswa, legalisasi transkrip, dan persiapan pelaksanaan wisuda.",
          "Kontribusi pada proyek website layanan KTM hilang dengan PHP berpola MVC — dicatat terpisah dari tugas layanan.",
        ],
        technologies: ["PHP", "CSS", "MySQL", "MVC"],
        relatedProjectSlug: "sistem-layanan-ktm-hilang",
        evidenceUrl: "/documents/sertifikat-pkl-its-2026.jpg",
        publicationStatus: "published",
        sortOrder: 1,
      },
      {
        organization: "PT Daksa Consultant Indonesia",
        role: "PKL — Student Developer",
        startDate: "2026-07-27",
        endDate: "2026-10-17",
        summary:
          "Mengawali PKL dengan desain konten Instagram menggunakan Canva, kemudian mengerjakan proyek website dengan CMS artikel dan layanan konsultasi.",
        responsibilities: [
          "Desain konten Instagram menggunakan Canva (pekerjaan desain, bukan coding).",
          "Pengembangan website CMS artikel dan layanan konsultasi dengan Next.js, React, dan Tailwind CSS.",
        ],
        technologies: ["Next.js", "React", "Tailwind CSS", "Canva"],
        relatedProjectSlug: "website-cms-konsultasi",
        publicationStatus: "published",
        sortOrder: 2,
      },
      {
        organization: "Lepas (Freelance)",
        role: "Desain UI/UX Aplikasi Desktop",
        startDate: null,
        endDate: null,
        summary:
          "Mengerjakan 7 desain antarmuka aplikasi desktop dengan Figma saat kelas 11 (6 pesanan rekan dan 1 tugas sendiri). Desain diteruskan untuk diimplementasikan dengan Python oleh pihak lain.",
        responsibilities: [
          "Merancang alur dan tampilan aplikasi desktop di Figma untuk kebutuhan tugas rekan dan sendiri.",
          "Menyerahkan hasil desain untuk diimplementasikan dengan Python (Tkinter/CustomTkinter) oleh pihak lain — tanpa klaim implementasi.",
        ],
        technologies: ["Figma"],
        relatedProjectSlug: null,
        publicationStatus: "published",
        sortOrder: 3,
      },
    ]);

  console.log("Seed selesai: profil, 3 proyek, 1 prestasi, 3 pengalaman.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
