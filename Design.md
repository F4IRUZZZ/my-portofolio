# Design.md

## UI/UX Design Specification

### Fairuz.dev. Personal Developer Portfolio & CMS

-   **Versi dokumen:** 1.0
-   **Status:** Draft untuk validasi
-   **Produk:** Website portofolio Student Developer
-   **Gaya:** Profesional, minimalis, modern, berorientasi proyek

------------------------------------------------------------------------

## 1. Tujuan Desain

Membuat website yang memberi kesan profesional, mudah dipindai, dan
berfokus pada bukti karya. Website harus cocok untuk siswa RPL yang
sedang membangun rekam jejak, tanpa berpura-pura memiliki pengalaman
senior.

Pengunjung harus bisa menjawab tiga pertanyaan dengan cepat: 1. Siapa
Fairuz dan apa fokusnya? 2. Proyek dan pencapaian apa yang dapat
dilihat? 3. Bagaimana cara menghubungi atau melihat karyanya lebih
lanjut?

Dashboard admin memiliki tujuan berbeda: mengelola konten dengan jelas,
aman, dan efisien.

## 2. Prinsip Desain

-   **Clarity first:** informasi penting lebih menonjol daripada
    dekorasi.
-   **Project-focused:** proyek dan kontribusi ditampilkan sebelum
    daftar teknologi yang panjang.
-   **Honest representation:** status proyek, peran, dan hasil ditulis
    sesuai fakta.
-   **Consistent system:** warna, spacing, tipografi, tombol, dan form
    mengikuti token yang sama.
-   **Responsive by default:** desain dibuat untuk layar ponsel hingga
    desktop.
-   **Accessible:** kontras, keyboard focus, label, alt text, dan
    struktur heading diperhatikan.
-   **Low maintenance:** komponen reusable dan pola layout konsisten.

## 3. Identitas Visual

### 3.1 Arah visual

Gunakan tema gelap bernuansa navy dengan aksen biru elektrik, permukaan
kartu sedikit lebih terang, dan teks berkontras tinggi. Hindari glow
berlebihan, gradient mencolok di setiap komponen, dan dekorasi kode yang
tidak memberi informasi.

### 3.2 Palet warna awal

  -----------------------------------------------------------------------
  Token                   Nilai                   Penggunaan
  ----------------------- ----------------------- -----------------------
  `background`            `#0B1020`               Latar utama

  `surface`               `#111827`               Kartu dan panel

  `surface-elevated`      `#182235`               Hover atau panel yang
                                                  lebih menonjol

  `text-primary`          `#F8FAFC`               Judul dan teks utama

  `text-secondary`        `#AAB4C5`               Deskripsi dan metadata

  `accent`                `#3B82F6`               CTA, link, fokus

  `accent-hover`          `#60A5FA`               Hover aksen

  `border`                `#273449`               Border halus

  `success`               `#22C55E`               Status berhasil

  `warning`               `#F59E0B`               Status butuh perhatian

  `danger`                `#EF4444`               Error dan tindakan
                                                  destruktif
  -----------------------------------------------------------------------

Warna status perlu tetap memiliki label teks atau ikon. Jangan
mengandalkan warna saja untuk menyampaikan arti. Uji kontras sebelum
rilis.

### 3.3 Tipografi

-   Rekomendasi: Geist atau Inter.
-   H1 desktop: sekitar 48--64 px, disesuaikan dengan panjang judul.
-   H1 mobile: sekitar 36--42 px.
-   H2: sekitar 28--36 px.
-   H3: sekitar 20--24 px.
-   Body: 16--18 px.
-   Metadata: 13--14 px, tetap terbaca.
-   Line-height body sekitar 1.5--1.7.
-   Batasi lebar paragraf agar mudah dibaca.

### 3.4 Spacing dan radius

Gunakan skala spacing berbasis kelipatan 4 atau 8 px. - Jarak
antarbagian desktop: 80--112 px. - Jarak antarbagian mobile: 56--72
px. - Padding kartu: 20--28 px. - Radius kartu: 12--16 px. - Radius
tombol dan input: 8--10 px. - Border tipis dan shadow minimal.

## 4. Navigasi dan Layout

### 4.1 Navbar publik

Desktop: - Brand `Fairuz.dev` di kiri. - Link: Tentang, Proyek,
Prestasi, Pengalaman, Artikel jika aktif. - Tombol utama: Hubungi
Saya. - Navbar sticky boleh digunakan jika tidak menghalangi konten.

Mobile: - Brand di kiri dan tombol menu di kanan. - Menu dapat dibuka
dengan keyboard dan screen reader. - Tutup menu setelah pengunjung
memilih halaman. - Pastikan tidak terjadi horizontal overflow.

### 4.2 Container

-   Lebar konten maksimum sekitar 1120--1200 px.
-   Gunakan padding horizontal responsif.
-   Teks panjang tidak memenuhi seluruh lebar layar.
-   Grid menyesuaikan jumlah kolom berdasarkan viewport.

### 4.3 Footer

Tampilkan nama/brand, tahun berjalan, tautan GitHub dan LinkedIn jika
tersedia, email publik jika disetujui, serta tautan navigasi utama.
Jangan menambahkan ikon sosial yang belum memiliki tujuan URL.

## 5. Spesifikasi Halaman Publik

### 5.1 Beranda `/`

Urutan section: 1. Navbar. 2. Hero. 3. Ringkasan profil. 4. Proyek
unggulan. 5. Prestasi utama. 6. Ringkasan pengalaman. 7. CTA kontak. 8.
Footer.

#### Hero

Headline yang disarankan: \> Saya Fairuz, Student Developer yang
membangun solusi digital melalui kode dan desain.

Subheadline: \> Siswa kelas 12 Rekayasa Perangkat Lunak di SMK Negeri 10
Surabaya. Tertarik pada pengembangan web, aplikasi, dan eksplorasi
teknologi.

CTA: - **Lihat Proyek** - **Tentang Saya** - Tautan unduh CV hanya
muncul jika file CV sudah tersedia.

Tampilkan label Student Developer. Jangan menambahkan angka pengalaman,
jumlah proyek, atau metrik yang belum diverifikasi.

#### Proyek unggulan

-   Desktop: grid 2 kolom atau layout editorial dengan satu proyek
    utama.
-   Mobile: satu kolom.
-   Setiap kartu berisi cover, judul, ringkasan, kategori, TechStack
    terbatas, status proyek, dan tautan detail.
-   Bedakan status pengerjaan dari status publikasi.
-   Jangan gunakan gambar mockup yang seolah-olah merupakan screenshot
    produk nyata.

#### Prestasi

Tampilkan Juara 3 LKS tingkat Kota Surabaya bidang Artificial
Intelligence sebagai pencapaian utama. Tambahkan tahun hanya setelah
dikonfirmasi. Gunakan dokumentasi asli jika ada izin.

#### Pengalaman

Tampilkan linimasa ringkas dua pengalaman PKL: - ITS, Direktorat
Pendidikan Sarjana & Pascasarjana. - PT Daksa Consultant Indonesia.

Jelaskan tugas operasional dan kontribusi proyek secara terpisah agar
tidak membesar-besarkan ruang lingkup pekerjaan.

### 5.2 Tentang Saya `/about`

Section yang disarankan: - Bio singkat. - Pendidikan. - Perjalanan
belajar. - Area minat. - TechStack berdasarkan tingkat pengalaman. - CTA
ke proyek dan kontak.

Kelompok TechStack: - **Pernah digunakan:** PHP, CSS, JavaScript dasar,
Python, CustomTkinter, Figma, draw.io. - **Sedang dikembangkan:**
Next.js, React, Tailwind CSS, TypeScript jika sudah mulai digunakan
langsung. - **Sedang dipelajari/direncanakan:** IoT atau UI/UX mobile
jika pembelajaran tersebut sudah benar-benar dimulai.

Jangan memakai persentase kemampuan seperti "PHP 90%". Gunakan label
yang lebih jujur, misalnya Pernah digunakan, Sedang dipelajari, atau
Digunakan pada proyek.

### 5.3 Daftar proyek `/projects`

-   Judul halaman dan pengantar pendek.
-   Filter kategori jika jumlah proyek sudah cukup banyak.
-   Kartu proyek dengan gambar, ringkasan, teknologi, dan status.
-   Empty state yang menjelaskan jika belum ada proyek untuk kategori
    tertentu.
-   Jangan membuat filter yang tidak bekerja.

Kategori awal: - Web Development - Desktop Application - UI/UX Design -
Artificial Intelligence - Other

Kategori hanya ditampilkan jika sesuai dengan karya yang benar-benar
tersedia.

### 5.4 Detail proyek `/projects/[slug]`

Urutan konten: 1. Breadcrumb. 2. Judul dan ringkasan. 3. Status
pengerjaan dan kategori. 4. Cover atau galeri screenshot. 5. Ringkasan
konteks dan masalah. 6. Peran dan kontribusi pribadi. 7. Fitur yang
telah dibuat. 8. TechStack. 9. Proses dan keputusan teknis. 10.
Tantangan dan pembelajaran. 11. Status saat ini dan keterbatasan. 12.
Repository/demo jika tersedia. 13. Proyek terkait.

#### Konten awal: Sistem Layanan KTM Hilang

-   Teknologi yang diketahui: PHP, CSS, pola MVC, dan database MySQL.
-   Struktur kode yang terlihat dari arsip mencakup controller, model,
    middleware autentikasi, view, dan skrip SQL.
-   Area fitur yang terlihat dari nama modul meliputi laporan KTM,
    pengecekan status, dashboard admin, pengelolaan akun, dan rekap.
    Verifikasi perilaku setiap fitur sebelum menyatakan semuanya
    berfungsi.
-   Status: belum tuntas ketika periode PKL berakhir.
-   Ceritakan kontribusi yang benar-benar dilakukan oleh Fairuz.
-   Jangan tampilkan informasi mahasiswa, data KTM, kredensial, atau
    data internal.
-   Jangan menjanjikan demo live jika aplikasi belum aman dan siap
    digunakan.

#### Konten awal: Website PKL kedua

-   Teknologi yang disebutkan: Next.js, React, Tailwind CSS.
-   Tujuan: website dengan CMS artikel dan layanan konsultasi.
-   Database masih dalam tahap penentuan saat informasi awal diberikan.
-   Status: dalam pengerjaan.
-   Pisahkan pekerjaan desain konten Instagram menggunakan Canva dari
    kontribusi pada proyek website.
-   Publikasikan hanya informasi dan aset yang telah mendapat izin.

### 5.5 Prestasi `/achievements`

-   Kartu prestasi berisi peringkat, lomba, bidang,
    penyelenggara/tingkat, tahun jika diketahui, dan ringkasan.
-   Gunakan dokumentasi atau sertifikat jika tersedia dan boleh
    dipublikasikan.
-   Jangan membuat sertifikat, logo penyelenggara, atau tanggal fiktif.

### 5.6 Pengalaman `/experience`

Gunakan timeline vertikal atau kartu pengalaman. Setiap entri berisi: -
Organisasi. - Periode yang telah dikonfirmasi. - Ringkasan kegiatan. -
Kontribusi yang relevan. - Proyek terkait. - Teknologi jika benar-benar
digunakan pada pengalaman tersebut.

Jangan menempatkan tugas layanan mahasiswa sebagai tugas coding.
Tampilkan keduanya secara jujur dan jelaskan bahwa proyek website KTM
diberikan menjelang akhir periode PKL.

### 5.7 Artikel `/articles` dan `/articles/[slug]`

Fitur ini merupakan prioritas P1 jika belum dibutuhkan pada rilis
pertama. - Daftar artikel berbentuk grid yang rapi. - Kartu berisi
judul, ringkasan, tanggal, tag, dan gambar opsional. - Detail artikel
memiliki lebar baca yang nyaman. - Gunakan format heading, list, code
block, dan gambar yang konsisten. - Artikel draft tidak dapat diakses
publik. - Jika belum ada artikel, tampilkan empty state atau sembunyikan
tautan artikel dari navigasi.

### 5.8 Kontak `/contact`

-   Email publik dan tautan sosial yang sudah diverifikasi.
-   Tombol copy email boleh ditambahkan jika benar-benar berfungsi.
-   `mailto:` dapat digunakan sebagai opsi sederhana.
-   Jangan menampilkan form kontak tanpa backend pengiriman atau
    penyimpanan pesan.

## 6. Spesifikasi Dashboard CMS

### 6.1 Layout admin

-   Sidebar desktop dengan menu: Dashboard, Proyek, Artikel, Prestasi,
    Pengalaman, Profil, Media jika tersedia, Pengaturan.
-   Mobile menggunakan drawer atau navigasi yang dapat diakses.
-   Area konten utama memiliki judul halaman, breadcrumb bila perlu, dan
    aksi utama.
-   Visual admin tetap konsisten dengan brand, tetapi mengutamakan
    keterbacaan dan efisiensi.

### 6.2 Dashboard

Tampilkan: - Jumlah proyek published dan draft. - Jumlah artikel
published dan draft jika fitur artikel aktif. - Shortcut Tambah
Proyek. - Daftar konten terbaru. - Peringatan jika profil belum lengkap.

Angka harus berasal dari data database. Jangan menampilkan angka statis
seolah-olah data nyata.

### 6.3 Daftar konten

-   Tabel pada desktop dan tampilan kartu/list pada mobile.
-   Kolom: judul, status, tanggal pembaruan, dan aksi.
-   Search atau filter ditambahkan sesuai kebutuhan nyata.
-   Sediakan loading, empty, error, dan success state.
-   Aksi hapus memerlukan dialog konfirmasi.
-   Status publikasi ditampilkan dengan teks, bukan warna saja.

### 6.4 Form proyek

Field: - Judul. - Slug. - Ringkasan. - Deskripsi. - Kategori. -
TechStack. - Peran dan kontribusi. - Status pengerjaan. - Status
publikasi. - Featured. - Cover dan media tambahan. - Repository/demo
opsional. - Periode proyek opsional. - Tantangan dan pembelajaran.

Perilaku: - Validasi field wajib. - Berikan preview slug. - Tangani slug
duplikat dengan pesan yang jelas. - Sediakan Simpan Draft dan
Publikasikan. - Konfirmasi sebelum membuang perubahan yang belum
disimpan jika implementasinya mendukung. - Jangan menampilkan status
sukses sebelum server mengonfirmasi operasi.

### 6.5 Form artikel

Field: - Judul. - Slug. - Ringkasan. - Isi. - Cover opsional. - Tag
opsional. - Status draft/published. - Metadata SEO.

Editor dapat dimulai dengan textarea/Markdown editor sederhana.
Rich-text editor kompleks tidak wajib untuk rilis pertama.

### 6.6 Autentikasi dan keamanan

-   Satu admin, tanpa sign-up publik.
-   Login, logout, dan sesi menggunakan mekanisme yang sesuai dengan
    solusi autentikasi terpilih.
-   Route dan operasi data diperiksa di server.
-   Tampilkan pesan error umum dan tidak membocorkan apakah email
    terdaftar.
-   Jangan menaruh secret di client components.
-   Form admin memiliki label, validasi, loading state, dan error state.

## 7. Design System dan Komponen

Komponen reusable yang disarankan: - `Container` - `Navbar` -
`MobileNavigation` - `Footer` - `SectionHeading` - `PrimaryButton` -
`SecondaryButton` - `ProjectCard` - `TechnologyTag` - `StatusBadge` -
`AchievementCard` - `ExperienceTimeline` - `SocialLink` - `EmptyState` -
`ErrorState` - `LoadingSkeleton` - `FormField` - `ConfirmDialog` -
`AdminSidebar` - `AdminHeader` - `DataTable` atau `ResponsiveDataList`

Gunakan semantic HTML. Tombol untuk aksi, link untuk navigasi. Jangan
menggunakan `div` sebagai tombol tanpa kebutuhan khusus dan dukungan
aksesibilitas.

## 8. Motion dan Interaksi

-   Transisi warna dan border sekitar 150--250 ms.
-   Animasi masuk section boleh digunakan secara ringan.
-   Hindari scroll hijacking, animasi yang menghalangi pembacaan, dan
    efek parallax berat.
-   Hormati `prefers-reduced-motion`.
-   Semua hover state harus memiliki padanan focus state.
-   Loading state digunakan untuk operasi asinkron.
-   Hindari interaksi dekoratif yang tidak membantu pengguna.

## 9. Responsivitas

Breakpoint dapat mengikuti breakpoint standar Tailwind, lalu disesuaikan
saat implementasi.

-   **Mobile:** satu kolom, navigasi ringkas, tombol mudah disentuh,
    teks tidak terlalu kecil.
-   **Tablet:** dua kolom jika konten sesuai.
-   **Desktop:** grid proyek dua atau tiga kolom sesuai lebar, container
    terpusat, navigasi penuh.
-   **Admin mobile:** tabel harus berubah menjadi list/kartu atau
    menyediakan overflow yang terkontrol.

Uji sekurangnya pada lebar sekitar 360 px, 768 px, 1024 px, dan 1440 px.

## 10. Aksesibilitas

-   Kontras teks memenuhi WCAG AA jika memungkinkan.
-   Fokus keyboard jelas.
-   Semua input mempunyai label.
-   Ikon aksi memiliki accessible name.
-   Gambar informatif mempunyai alt text; gambar dekoratif menggunakan
    alt kosong.
-   Dialog mengelola fokus dan dapat ditutup dengan keyboard.
-   Status sukses dan error diumumkan secara sesuai.
-   Heading tidak melompat tingkat tanpa alasan.
-   Jangan menggunakan warna sebagai satu-satunya penanda status.

## 11. Konten dan Copywriting

Gunakan bahasa Indonesia sebagai bahasa utama. Istilah teknologi umum
seperti TechStack, CMS, CRUD, dan deployment dapat dipertahankan.

Nada: - Profesional. - Jelas dan ringkas. - Rendah hati, tetapi percaya
diri. - Berorientasi pada kontribusi dan pembelajaran. - Tidak mengklaim
sebagai senior/expert.

Contoh headline: \> Saya Fairuz, Student Developer yang membangun solusi
digital melalui kode dan desain.

Contoh ringkasan proyek KTM: \> Website layanan pengurusan KTM hilang
yang dikembangkan selama PKL di ITS menggunakan PHP dengan pola MVC.
Proyek ini mencakup modul pelaporan dan pengelolaan oleh admin, dengan
status akhir yang masih dalam pengembangan karena keterbatasan waktu
PKL.

Ringkasan tersebut harus ditinjau ulang setelah fitur yang benar-benar
berjalan diverifikasi.

## 12. Status dan Empty State

Gunakan label yang konsisten: - `In Progress` --- pengerjaan belum
selesai. - `Completed` --- selesai sesuai ruang lingkup yang
ditetapkan. - `Archived` --- tidak lagi aktif dikembangkan. - `Draft`
--- belum dipublikasikan. - `Published` --- tersedia untuk publik.

Status proyek berbeda dari status publikasi. Proyek `In Progress` boleh
`Published` jika pemilik ingin menjelaskan progresnya secara terbuka.

Contoh empty state: - Proyek: "Proyek akan ditambahkan di sini." -
Artikel: "Belum ada artikel yang dipublikasikan." - Pencarian: "Tidak
ada hasil yang cocok. Coba kata kunci lain."

## 13. Aturan Gambar dan Media

-   Gunakan screenshot proyek asli jika diizinkan.
-   Jangan menggunakan screenshot berisi nama, nomor mahasiswa, KTM,
    email pribadi, kredensial, atau informasi internal.
-   Sediakan placeholder netral saat gambar belum tersedia.
-   Pertahankan rasio gambar yang konsisten pada kartu.
-   Optimalkan ukuran gambar.
-   Semua gambar harus mempunyai tujuan visual atau informasional yang
    jelas.

## 14. Hal yang Harus Dihindari

-   Skill bar persentase yang tidak terukur.
-   Testimoni palsu.
-   Statistik proyek atau pengguna yang dibuat-buat.
-   Logo perusahaan atau institusi tanpa kebutuhan dan izin yang sesuai.
-   Tombol yang tidak bekerja.
-   Data demo yang tampil seperti data asli di production.
-   Placeholder `#` untuk tautan yang seolah-olah sudah tersedia.
-   Animasi berlebihan.
-   Mengklaim proyek PKL sudah selesai ketika masih dalam pengembangan.
-   Memublikasikan aset perusahaan tanpa izin.

## 15. Acceptance Checklist Desain

-   [ ] Identitas Student Developer terlihat jelas pada beranda.
-   [ ] Proyek unggulan mudah ditemukan.
-   [ ] Status proyek dan kontribusi dijelaskan dengan jujur.
-   [ ] Navigasi konsisten di semua halaman.
-   [ ] Kartu proyek memiliki struktur dan tinggi yang rapi.
-   [ ] Tampilan mobile tidak mengalami horizontal overflow.
-   [ ] Semua tombol, link, input, dan dialog memiliki state yang
    sesuai.
-   [ ] Focus state dan kontras memadai.
-   [ ] Halaman admin mudah digunakan pada desktop dan mobile.
-   [ ] Draft tidak terlihat oleh pengunjung publik.
-   [ ] Konten yang belum tersedia tidak diganti dengan data fiktif.
-   [ ] Gambar dan detail proyek telah diperiksa izinnya.

## 16. Instruksi untuk Implementasi UI

1.  Baca `PRD.md` untuk memahami cakupan fitur dan kriteria penerimaan.
2.  Implementasikan design token dan komponen reusable sebelum membangun
    seluruh halaman.
3.  Gunakan Next.js App Router, React, Tailwind CSS, dan TypeScript.
4.  Utamakan halaman publik dan alur CMS P0.
5.  Gunakan data contoh hanya di lingkungan development dan tandai
    dengan jelas.
6.  Jangan mengarang informasi profil, tanggal, hasil, atau tautan.
7.  Buat loading, empty, error, success, dan disabled state untuk
    komponen yang memerlukannya.
8.  Uji responsivitas, aksesibilitas keyboard, kontras, dan navigasi.
9.  Jangan membuat tombol atau menu yang hanya bersifat dekoratif.
10. Jika detail visual belum ditetapkan, ikuti prinsip pada dokumen ini
    dan pilih implementasi yang paling sederhana serta konsisten.
