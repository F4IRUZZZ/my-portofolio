# PRD.md

## Product Requirements Document

### Fairuz.dev. Personal Developer Portfolio & CMS

-   **Versi dokumen:** 1.0
-   **Status:** Draft untuk validasi
-   **Pemilik produk:** Alfairuz Atthariq Satria
-   **Produk:** Website portofolio personal dengan CMS privat
-   **Target utama:** Recruiter, pihak kampus, calon kolaborator, dan
    pengunjung profesional

------------------------------------------------------------------------

## 1. Ringkasan Produk

Fairuz.dev adalah website portofolio personal untuk menampilkan
identitas, kemampuan, proyek, prestasi, dan pengalaman PKL Alfairuz
Atthariq Satria, siswa kelas 12 jurusan Rekayasa Perangkat Lunak (RPL)
di SMK Negeri 10 Surabaya.

Website harus memberi pengunjung cara yang cepat untuk memahami latar
belakang Fairuz, melihat bukti proyek yang pernah dikerjakan, dan
menghubunginya. Website juga menyediakan dashboard CMS privat agar
pemilik dapat mengelola konten tanpa mengubah kode secara langsung.

Portofolio harus menggambarkan Fairuz sebagai **Student Developer yang
sedang berkembang**. Konten tidak boleh mengklaim keahlian, hasil, atau
penyelesaian proyek yang belum dapat dibuktikan.

## 2. Latar Belakang

Informasi awal pemilik: - Siswa kelas 12 SMK Negeri 10 Surabaya, jurusan
Rekayasa Perangkat Lunak. - Meraih Juara 3 Lomba Kompetensi Siswa (LKS)
tingkat Kota Surabaya bidang Artificial Intelligence. - Mempelajari PHP
dasar hingga menengah, CSS dan JavaScript dasar, CRUD dengan PHP, UI/UX
menggunakan Figma, ERD menggunakan draw.io, serta aplikasi desktop
Python dengan CustomTkinter. - Sedang mempelajari Next.js, React, dan
Tailwind CSS melalui proyek PKL. - PKL pertama berlangsung di Institut
Teknologi Sepuluh Nopember (ITS), Direktorat Pendidikan Sarjana &
Pascasarjana, pada 2 Februari hingga 30 April. Pekerjaan mencakup
dukungan layanan mahasiswa dan proyek website layanan pengurusan KTM
hilang menggunakan PHP dengan pola MVC dan CSS. Proyek belum tuntas
karena waktu PKL terbatas. - PKL kedua berlangsung di PT Daksa
Consultant Indonesia pada 29 Juli hingga 17 Oktober. Pekerjaan awal
meliputi desain konten Instagram menggunakan Canva. Selanjutnya, pemilik
mulai mengerjakan website dengan CMS artikel dan layanan konsultasi
menggunakan Next.js, React, dan Tailwind CSS. Database masih dalam tahap
penentuan.

Nama dan tanggal dapat diperbarui oleh pemilik sebelum publikasi. Tahun
untuk periode PKL dan LKS belum dicantumkan karena belum dikonfirmasi
dalam data awal.

## 3. Tujuan Produk

### 3.1 Tujuan utama

1.  Membangun identitas profesional digital sebagai Student Developer.
2.  Menyajikan proyek dan kontribusi dengan penjelasan yang transparan.
3.  Mendukung kebutuhan melamar kerja/magang dan pendaftaran kuliah.
4.  Memudahkan pemilik memperbarui konten melalui CMS.
5.  Menjadi arsip perkembangan belajar dan karya yang dapat terus
    ditambahkan.

### 3.2 Indikator keberhasilan

-   Pengunjung dapat menemukan proyek unggulan dalam maksimal dua
    interaksi dari beranda.
-   Setiap proyek publik memiliki deskripsi, peran, teknologi, status,
    dan media pendukung jika tersedia.
-   Semua halaman utama dapat digunakan pada ponsel, tablet, dan
    desktop.
-   Pemilik dapat membuat, mengubah, menerbitkan, membatalkan publikasi,
    dan menghapus konten melalui CMS.
-   Halaman publik tidak membocorkan data admin, kredensial, atau konten
    draft.
-   Semua klaim prestasi dan pengalaman dapat ditelusuri ke informasi
    yang telah diverifikasi pemilik.

## 4. Target Pengguna

### 4.1 Pengunjung publik

-   Recruiter atau perusahaan yang mencari kandidat magang/junior.
-   Kampus atau pihak seleksi pendidikan.
-   Developer, mentor, atau calon kolaborator.
-   Pengunjung yang ingin melihat karya dan perkembangan pemilik.

Kebutuhan: mengenal pemilik dengan cepat, memeriksa proyek, memahami
kontribusi individu, dan menemukan kontak.

### 4.2 Administrator

-   Alfairuz Atthariq Satria sebagai satu-satunya admin pada versi
    pertama.

Kebutuhan: mengelola proyek, artikel, prestasi, pengalaman, profil,
tautan, dan gambar melalui antarmuka yang mudah digunakan.

## 5. Ruang Lingkup

### 5.1 P0. Wajib untuk rilis pertama

-   Beranda responsif.
-   Halaman Tentang Saya.
-   Daftar proyek dan halaman detail proyek.
-   Halaman prestasi.
-   Halaman pengalaman.
-   Halaman kontak.
-   Tautan eksternal ke GitHub, LinkedIn, dan CV jika tersedia.
-   Login admin.
-   Dashboard CMS privat.
-   CRUD proyek.
-   Pengelolaan profil, prestasi, dan pengalaman.
-   Status draft/published untuk konten yang mendukung publikasi.
-   Penyimpanan data di Neon PostgreSQL.
-   Validasi input dan proteksi route admin di sisi server.
-   Metadata SEO dasar dan halaman 404.
-   Pengelolaan gambar proyek dengan penyimpanan media yang sesuai.

### 5.2 P1. Setelah rilis inti stabil

-   CMS artikel dan halaman daftar/detail artikel.
-   Media library.
-   Filter proyek berdasarkan kategori atau teknologi.
-   Preview draft.
-   SEO metadata per proyek dan artikel.
-   Halaman CV yang dapat diunduh.
-   Sitemap dan Open Graph image.

### 5.3 P2. Opsional

-   Analitik pengunjung yang menghormati privasi.
-   Pencarian artikel.
-   Mode terang/gelap.
-   Animasi lanjutan.
-   Formulir kontak yang menyimpan pesan, jika memang dibutuhkan dan
    dilengkapi proteksi spam.

### 5.4 Di luar ruang lingkup awal

-   Pendaftaran akun publik.
-   Multi-admin dan sistem role yang kompleks.
-   Komentar publik.
-   Sistem like/follow.
-   Integrasi CRM atau newsletter.
-   Fitur konsultasi dari proyek PKL kedua. Fitur ini milik proyek
    perusahaan dan tidak otomatis menjadi fitur portofolio.
-   Menyalin kode, data, atau aset internal perusahaan ke portofolio
    tanpa izin.

## 6. Struktur Halaman

### Halaman publik

1.  `/` --- Beranda
2.  `/about` --- Tentang Saya
3.  `/projects` --- Daftar proyek
4.  `/projects/[slug]` --- Detail proyek
5.  `/achievements` --- Prestasi
6.  `/experience` --- Pengalaman PKL
7.  `/articles` --- Daftar artikel, P1
8.  `/articles/[slug]` --- Detail artikel, P1
9.  `/contact` --- Kontak
10. `/privacy` --- Kebijakan privasi singkat jika website memproses data
    pengunjung
11. `not-found` --- Halaman tidak ditemukan

### Halaman admin

-   `/admin/login`
-   `/admin`
-   `/admin/projects`
-   `/admin/projects/new`
-   `/admin/projects/[id]/edit`
-   `/admin/articles` dan halaman tambah/edit artikel, P1
-   `/admin/achievements`
-   `/admin/experience`
-   `/admin/profile`
-   `/admin/media`, P1
-   `/admin/settings`

Semua route `/admin` kecuali login wajib memerlukan autentikasi.
Otorisasi harus divalidasi di server, bukan hanya dengan menyembunyikan
menu di UI.

## 7. Kebutuhan Fungsional

### FR-01. Beranda

-   Menampilkan nama, identitas sebagai Student Developer, ringkasan
    singkat, dan CTA.
-   Menampilkan beberapa proyek unggulan yang berstatus published.
-   Menampilkan prestasi utama berupa Juara 3 LKS tingkat Kota Surabaya
    bidang Artificial Intelligence.
-   Menyediakan tautan ke proyek, profil, pengalaman, dan kontak.
-   Tidak menampilkan konten draft.

### FR-02. Profil

-   Admin dapat mengubah nama tampilan, headline, bio, pendidikan,
    lokasi umum, foto profil, email publik, tautan sosial, dan tautan
    CV.
-   Field opsional boleh dikosongkan dan tidak menampilkan placeholder
    palsu.
-   Kontak pribadi tidak boleh dipublikasikan tanpa persetujuan pemilik.

### FR-03. Proyek

-   Pengunjung dapat melihat daftar proyek published.
-   Admin dapat membuat, membaca, mengedit, menghapus, dan mengubah
    status publikasi proyek.
-   Proyek memiliki judul, slug unik, ringkasan, deskripsi, kategori,
    TechStack, peran, status pengerjaan, tanggal/periode bila diketahui,
    gambar, fitur, tantangan, pembelajaran, dan tautan opsional.
-   Link demo dan repository hanya ditampilkan jika tersedia dan aman
    dibagikan.
-   Status pengerjaan harus mendukung sekurangnya `In Progress`,
    `Completed`, dan `Archived`.
-   Status publikasi konten dipisahkan dari status pengerjaan proyek.
    Contoh: proyek yang masih In Progress tetap bisa dipublikasikan
    dengan keterangan yang jujur.

### FR-04. Detail proyek

-   Menjelaskan masalah atau kebutuhan, tujuan, kontribusi pribadi,
    proses, fitur, teknologi, hasil yang dapat dibuktikan, tantangan,
    dan pembelajaran.
-   Menampilkan screenshot yang memiliki izin publikasi.
-   Menghindari klaim metrik atau dampak tanpa data.
-   Menyatakan proyek belum selesai jika memang belum selesai.

### FR-05. Prestasi

-   Admin dapat mengelola nama prestasi, penyelenggara, kategori,
    peringkat, lokasi, tahun/tanggal jika terverifikasi, deskripsi, dan
    bukti opsional.
-   Prestasi LKS ditampilkan sebagai Juara 3 tingkat Kota Surabaya
    bidang Artificial Intelligence.
-   Tahun dan dokumen pendukung tidak boleh ditebak.

### FR-06. Pengalaman

-   Admin dapat menambah dan mengubah organisasi/perusahaan, posisi atau
    konteks PKL, periode, ringkasan, tanggung jawab, proyek terkait, dan
    media opsional.
-   Pengalaman ITS harus memisahkan tugas layanan mahasiswa dari
    kontribusi pada proyek website KTM.
-   Pengalaman PT Daksa harus memisahkan desain konten Canva dari proyek
    website yang sedang dikerjakan.
-   Informasi internal atau rahasia perusahaan tidak boleh
    dipublikasikan.

### FR-07. Artikel, P1

-   Admin dapat membuat, mengedit, menghapus, menyimpan draft, dan
    menerbitkan artikel.
-   Artikel memiliki judul, slug, ringkasan, isi, gambar utama opsional,
    tag, tanggal publikasi, dan metadata SEO.
-   Artikel draft tidak dapat diakses publik melalui URL normal.

### FR-08. Autentikasi admin

-   Satu akun admin pada versi pertama.
-   Tidak ada pendaftaran publik.
-   Password disimpan melalui mekanisme hashing yang aman dari pustaka
    autentikasi tepercaya, bukan teks biasa.
-   Sesi dikelola dengan cookie aman, HttpOnly, Secure pada production,
    dan SameSite yang sesuai.
-   Login, logout, dan route admin harus diuji.
-   Pesan error login tidak boleh mengungkap apakah email tertentu
    terdaftar.
-   Sediakan cara pemulihan admin yang aman sesuai layanan autentikasi
    yang dipilih.

### FR-09. Kontak

-   Menampilkan email publik dan tautan profesional yang disediakan
    pemilik.
-   CTA email menggunakan `mailto:` jika tidak ada backend pesan.
-   Jangan menampilkan form yang seolah-olah mengirim pesan jika backend
    belum tersedia.

### FR-10. Media

-   Admin dapat mengunggah gambar yang memenuhi batas tipe dan ukuran.
-   Validasi tipe file dilakukan di server, bukan hanya berdasarkan
    ekstensi.
-   Gunakan layanan object storage untuk media production. Jangan
    mengandalkan filesystem lokal deployment serverless sebagai
    penyimpanan permanen.
-   Hindari menyimpan file gambar berukuran besar sebagai bytea di tabel
    database tanpa kebutuhan khusus.

### FR-11. SEO dan berbagi

-   Setiap halaman memiliki title dan description yang sesuai.
-   Proyek dan artikel memiliki slug yang stabil.
-   Sediakan Open Graph metadata dan sitemap untuk halaman publik.
-   Halaman admin, login, draft, dan data privat tidak boleh diindeks.

## 8. Kebutuhan Nonfungsional

### NFR-01. Responsivitas

-   Layout berfungsi pada viewport ponsel, tablet, laptop, dan desktop.
-   Tidak ada horizontal overflow pada halaman utama.

### NFR-02. Aksesibilitas

-   Gunakan struktur heading yang benar, label form, focus state yang
    terlihat, alt text gambar, dan kontras warna yang memadai.
-   Semua fungsi utama dapat digunakan dengan keyboard.

### NFR-03. Performa

-   Gunakan optimasi gambar Next.js sesuai layanan storage.
-   Hindari animasi berat dan dependensi yang tidak dibutuhkan.
-   Target Lighthouse awal: Performance, Accessibility, Best Practices,
    dan SEO diupayakan mencapai 90+ pada halaman representatif, tanpa
    menjadikan skor sebagai pengganti pengujian pengguna.

### NFR-04. Keamanan

-   Validasi dan sanitasi input.
-   Proteksi route dan operasi CMS di server.
-   Rahasia disimpan di environment variables.
-   Tidak mengekspos `DATABASE_URL`, token, atau secret di browser.
-   Batasi tipe dan ukuran upload.
-   Gunakan query parameterized/ORM.
-   Tambahkan rate limiting pada autentikasi bila didukung arsitektur.
-   Jangan menyimpan data pribadi yang tidak diperlukan.

### NFR-05. Maintainability

-   Gunakan TypeScript.
-   Pisahkan UI, validasi, akses database, dan aturan bisnis.
-   Gunakan komponen reusable.
-   Sertakan `.env.example` tanpa secret.
-   Sediakan dokumentasi instalasi, migrasi database, dan deployment.

### NFR-06. Reliability

-   Migrasi database dapat dijalankan ulang secara terkontrol.
-   Tampilkan error state dan empty state yang jelas.
-   Operasi gagal tidak boleh menampilkan pesan sukses palsu.

## 9. Rekomendasi TechStack

-   **Framework:** Next.js dengan App Router.
-   **UI:** React.
-   **Styling:** Tailwind CSS.
-   **Visual & Motion (Amandemen Redesign):**
    -   Tema visual: **Obsidian Forge** (matte graphite carbon `#0C0D10`
        dengan aksen Electric Tangerine `#FF6B2C` dan Indigo Slate
        `#818CF8`). Tipografi: Space Grotesk (display), Geist (body),
        JetBrains Mono (label/code).
    -   Smooth scroll: Lenis (virtual scroll sinkron WebGL).
    -   Lapisan 3D: React Three Fiber (R3F) untuk canvas background
        partikel/grid yang reaktif terhadap kursor dan scroll.
    -   Anggaran performa 3D: JS tambahan ≤ ~500KB gzip; DPR dibatasi 2
        (1 di mobile); pause saat tab/cakupan tidak terlihat; target 60
        FPS desktop dan 30+ FPS mobile menengah.
    -   Aksesibilitas keras: `prefers-reduced-motion` menonaktifkan
        smooth scroll dan animasi 3D total (kembali ke scroll native +
        latar statis). Konten tetap terbaca 100% tanpa JavaScript.
-   Bahasa: TypeScript.
-   **Database:** Neon PostgreSQL.
-   **ORM:** Drizzle ORM sebagai pilihan awal yang ringan dan cocok
    untuk PostgreSQL. Prisma dapat dipilih sebagai alternatif, tetapi
    jangan menggunakan keduanya sekaligus tanpa alasan kuat.
-   **Validasi schema:** Zod.
-   **Form:** React Hook Form jika form CMS membutuhkannya.
-   **Autentikasi:** pilih satu solusi yang kompatibel dengan Next.js
    dan database yang digunakan. Evaluasi Auth.js atau penyedia
    autentikasi terkelola sebelum implementasi.
-   **Media:** object storage yang kompatibel dengan deployment,
    misalnya Cloudinary atau layanan S3-compatible.
-   **Ikon:** Lucide.
-   **Deployment:** Vercel untuk aplikasi, Neon untuk database, dan
    layanan storage terpisah untuk media.
-   **Version control:** Git dan GitHub.

Versi paket harus mengikuti versi stabil yang kompatibel saat
implementasi. Jangan mengunci nomor versi berdasarkan dokumen ini.

## 10. Model Data Awal

Skema berikut adalah rancangan awal. Detail kolom dan relasi perlu
divalidasi ketika implementasi dimulai.

### `admin_users`

-   `id`
-   `email` unik
-   `password_hash` hanya jika autentikasi lokal dipilih
-   `created_at`
-   `updated_at`

Jika solusi autentikasi eksternal mengelola identitas dan password,
jangan menyimpan password kedua kali.

### `profiles`

-   `id`
-   `full_name`
-   `headline`
-   `bio`
-   `education`
-   `public_email` nullable
-   `profile_image_url` nullable
-   `cv_url` nullable
-   `github_url` nullable
-   `linkedin_url` nullable
-   `updated_at`

Versi pertama dapat membatasi profil menjadi satu record aktif.

### `projects`

-   `id`
-   `title`
-   `slug` unik
-   `summary`
-   `description` atau field konten terstruktur
-   `category`
-   `role`
-   `work_status`
-   `is_featured`
-   `publication_status`
-   `start_date` nullable
-   `end_date` nullable
-   `repository_url` nullable
-   `demo_url` nullable
-   `cover_image_url` nullable
-   `created_at`
-   `updated_at`
-   `published_at` nullable

### `project_technologies`

-   `project_id`
-   `technology_name`

Gunakan tabel penghubung jika membutuhkan pencarian dan filter teknologi
yang konsisten. Untuk versi yang sangat sederhana, teknologi bisa
disimpan sebagai array PostgreSQL, tetapi pilih satu pendekatan dan
gunakan secara konsisten.

### `project_media`

-   `id`
-   `project_id`
-   `image_url`
-   `alt_text`
-   `sort_order`

### `achievements`

-   `id`
-   `title`
-   `organizer`
-   `category`
-   `rank`
-   `location`
-   `achievement_date` nullable
-   `description`
-   `evidence_url` nullable
-   `publication_status`

### `experiences`

-   `id`
-   `organization`
-   `role`
-   `location` nullable
-   `start_date` nullable
-   `end_date` nullable
-   `summary`
-   `responsibilities`
-   `related_project_id` nullable
-   `publication_status`

### `articles`, P1

-   `id`
-   `title`
-   `slug` unik
-   `excerpt`
-   `content`
-   `cover_image_url` nullable
-   `publication_status`
-   `published_at` nullable
-   `created_at`
-   `updated_at`

Tambahkan tabel tag dan relasinya hanya jika fitur tagging benar-benar
diperlukan.

### Aturan data

-   Gunakan timestamp dengan zona waktu yang sesuai.
-   Slug harus unik.
-   Hapus konten dengan mempertimbangkan relasi media dan riwayat.
-   Jangan menyimpan password sebagai teks biasa.
-   Jangan menyimpan URL gambar yang belum diverifikasi.
-   Jangan mengisi tanggal, metrik, atau pencapaian yang belum
    dikonfirmasi.

## 11. Kriteria Penerimaan

### Website publik

-   [ ] Semua halaman P0 dapat dibuka tanpa login.
-   [ ] Hanya konten published yang muncul pada halaman publik.
-   [ ] Navigasi berfungsi di desktop dan mobile.
-   [ ] Halaman detail proyek menampilkan status pengerjaan secara
    jelas.
-   [ ] Tautan eksternal yang tidak tersedia tidak ditampilkan.
-   [ ] Halaman tidak ditemukan memiliki tampilan yang konsisten.
-   [ ] Metadata dasar tersedia.

### CMS

-   [ ] Pengguna tanpa sesi tidak dapat mengakses dashboard atau
    menjalankan operasi mutasi.
-   [ ] Login dan logout berfungsi.
-   [ ] Admin dapat melakukan CRUD proyek.
-   [ ] Validasi menampilkan pesan yang dapat dipahami.
-   [ ] Slug duplikat ditolak atau ditangani dengan jelas.
-   [ ] Draft tidak muncul di halaman publik.
-   [ ] Gagal menyimpan menampilkan error dan tidak mengklaim sukses.
-   [ ] Upload menolak file yang tidak sesuai aturan.
-   [ ] Secret tidak muncul di bundle frontend atau repositori.

### Data dan deployment

-   [ ] Migrasi database berhasil di lingkungan target.
-   [ ] Environment variables didokumentasikan.
-   [ ] Aplikasi dapat dijalankan secara lokal berdasarkan README.
-   [ ] Build production berhasil.
-   [ ] Konten awal telah diverifikasi oleh pemilik.

## 12. Risiko dan Mitigasi

  -----------------------------------------------------------------------
  Risiko                              Mitigasi
  ----------------------------------- -----------------------------------
  Portofolio terlalu luas karena CMS  Prioritaskan P0 dan jadikan
                                      artikel/media library sebagai P1

  Proyek PKL belum selesai            Tampilkan status dan kontribusi
                                      secara transparan

  Data atau aset perusahaan bersifat  Minta izin dan gunakan screenshot
  internal                            yang sudah disetujui

  Konten belum lengkap                Gunakan field opsional, jangan
                                      mengarang data

  Upload media hilang saat deployment Gunakan object storage

  Akses admin tidak aman              Otorisasi server-side, cookie aman,
                                      validasi, dan tanpa pendaftaran
                                      publik

  Biaya atau batas layanan berubah    Periksa ketentuan dan limit Neon,
                                      hosting, serta storage sebelum
                                      rilis
  -----------------------------------------------------------------------

## 13. Asumsi yang Perlu Dikonfirmasi

1.  Nama brand final, apakah `Fairuz.dev` atau nama lain.
2.  Tahun tepat untuk LKS dan masing-masing periode PKL.
3.  Link GitHub, LinkedIn, email profesional, dan CV yang ingin
    dipublikasikan.
4.  Izin publikasi screenshot dan detail proyek PKL.
5.  Apakah CMS artikel termasuk rilis pertama atau rilis kedua.
6.  Penyedia autentikasi dan media storage yang akan dipakai.
7.  Domain dan target deployment.

## 14. Traceability Requirement

  -------------------------------------------------------------------------
  ID                Kebutuhan         Alasan              Kriteria terkait
  ----------------- ----------------- ------------------- -----------------
  FR-01             Beranda           Memperkenalkan      Beranda publik
                                      pemilik dengan      
                                      cepat               

  FR-02             Profil            Menyediakan         CRUD profil
                                      identitas yang      
                                      dapat diperbarui    

  FR-03             Proyek            Menunjukkan bukti   CRUD dan detail
                                      kemampuan teknis    proyek

  FR-04             Detail proyek     Menjelaskan         Konten proyek
                                      kontribusi dan      transparan
                                      proses              

  FR-05             Prestasi          Menampilkan LKS AI  Data prestasi
                                                          terverifikasi

  FR-06             Pengalaman        Menunjukkan         Linimasa
                                      pengalaman PKL      pengalaman

  FR-07             Artikel           Mendokumentasikan   P1 CMS artikel
                                      pembelajaran        

  FR-08             Autentikasi       Melindungi CMS      Route dan mutasi
                                                          terlindungi

  FR-09             Kontak            Mempermudah         Email dan tautan
                                      komunikasi          berfungsi
                                      profesional         

  FR-10             Media             Mendukung bukti     Upload aman dan
                                      visual              storage persisten

  FR-11             SEO               Membantu penemuan   Metadata dan
                                      halaman publik      sitemap

  NFR-01            Responsif         Penggunaan lintas   Uji viewport
                                      perangkat           

  NFR-03            Performa          Pengalaman          Audit halaman
                                      pengunjung yang     
                                      baik                

  NFR-04            Keamanan          Melindungi konten   Pengujian akses
                                      dan admin           dan input

  NFR-05            Maintainability   Memudahkan          Struktur kode dan
                                      pengembangan        dokumentasi
                                      lanjutan            
  -------------------------------------------------------------------------

## 15. Instruksi Implementasi untuk AI Coding Agent

1.  Baca `PRD.md` dan `Design.md` sebelum menulis kode.
2.  Periksa struktur repositori yang sudah ada. Jangan menghapus atau
    menimpa file penting tanpa alasan dan penjelasan.
3.  Implementasikan P0 terlebih dahulu. Jangan menambahkan fitur P1/P2
    sebelum P0 berjalan.
4.  Gunakan Next.js App Router, React, Tailwind CSS, dan TypeScript.
5.  Gunakan Neon PostgreSQL jika penyimpanan persisten dibutuhkan.
    Jangan menambahkan database kedua tanpa persetujuan.
6.  Pilih satu ORM dan satu strategi autentikasi. Dokumentasikan
    alasannya.
7.  Jangan membuat data profil, tahun, prestasi, hasil proyek, atau
    tautan palsu. Gunakan placeholder yang jelas untuk data yang belum
    diberikan.
8.  Jangan mengklaim integrasi, upload, login, atau penyimpanan berhasil
    sebelum fungsi tersebut benar-benar bekerja.
9.  Sertakan migrasi, `.env.example`, README, validasi, error state,
    empty state, dan pengujian dasar.
10. Jangan menampilkan data draft pada halaman publik.
11. Lindungi semua operasi admin di server.
12. Setelah setiap tahap, jalankan lint, typecheck, test yang tersedia,
    dan build. Laporkan hasil serta pekerjaan yang belum selesai.
13. Jika ada keputusan yang berdampak besar tetapi belum dijelaskan di
    dokumen, ajukan pertanyaan atau pilih solusi paling sederhana dan
    dokumentasikan asumsi tersebut.

## 16. Definisi Selesai

Rilis pertama dianggap siap ketika: - Semua fitur P0 berjalan. - Konten
yang dipublikasikan sudah diverifikasi. - CMS aman untuk satu admin. -
Database dan media tetap tersedia setelah deployment. - Tampilan
responsif dan aksesibilitas dasar telah diuji. - Build production
berhasil. - README menjelaskan instalasi, konfigurasi environment,
migrasi, dan deployment. - Tidak ada secret di repositori dan tidak ada
klaim proyek yang belum terverifikasi.
