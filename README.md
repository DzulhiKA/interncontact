---

## ⚙️ Instalasi & Setup

### 1. Clone repository
```bash
git clone https://github.com/DzulhiKA/interncontact.git
cd interncontact
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Supabase
1. Buat project di [supabase.com](https://supabase.com)
2. Buka **SQL Editor** → paste isi `supabase-schema.sql` → klik **Run**
3. Buka **Authentication → Providers → Email** → matikan **Confirm email**
4. Salin **Project URL** dan **Anon Key** dari **Settings → API**

### 4. Konfigurasi environment
```bash
cp .env.local.example .env.local
```
Isi `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

### 5. Jalankan development server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000)

---

## 🧪 Hasil Pengujian

Pengujian dilakukan berdasarkan aspek kualitas perangkat lunak mengacu pada use case diagram Daily Project 6 dengan metode **Black Box Testing**.

### Pengujian Fungsional per Use Case

#### UC-01: Register & Login (Autentikasi)
| No | Skenario Uji | Input | Expected Output | Actual Output | Status |
|----|-------------|-------|-----------------|---------------|--------|
| 1 | Register akun baru dengan data lengkap | Nama, email, password, universitas, jurusan | Akun berhasil dibuat, redirect ke dashboard | Akun berhasil dibuat, redirect ke `/dashboard` | ✅ Pass |
| 2 | Register dengan email yang sudah terdaftar | Email yang sudah dipakai | Muncul pesan error "Email sudah terdaftar" | Menampilkan error "Email sudah terdaftar. Silakan login." | ✅ Pass |
| 3 | Login dengan kredensial yang benar | Email & password valid | Redirect ke dashboard | Redirect ke `/dashboard` | ✅ Pass |
| 4 | Login dengan password salah | Email benar, password salah | Muncul pesan error | Menampilkan "Email atau password salah. Coba lagi." | ✅ Pass |
| 5 | Register tanpa verifikasi email | - | Langsung masuk tanpa cek email | Langsung redirect ke dashboard tanpa verifikasi email | ✅ Pass |
| 6 | Logout dari aplikasi | Klik tombol "Keluar" | Session dihapus, redirect ke `/auth` | Berhasil logout dan redirect ke halaman auth | ✅ Pass |

#### UC-02: Rekomendasi Magang Berbasis AI
| No | Skenario Uji | Input | Expected Output | Actual Output | Status |
|----|-------------|-------|-----------------|---------------|--------|
| 7 | Tampil daftar lowongan magang | Buka halaman `/jobs` | Daftar lowongan tampil lengkap | Daftar 6 lowongan tampil dengan detail perusahaan, lokasi, dan gaji | ✅ Pass |
| 8 | Aktifkan AI Matching Mode | Toggle AI Mode ON | Lowongan diurutkan berdasarkan % match tertinggi | Lowongan terurut dari 98% hingga 73% match | ✅ Pass |
| 9 | Nonaktifkan AI Matching Mode | Toggle AI Mode OFF | Lowongan tampil tanpa urutan match | Badge match hilang, urutan default | ✅ Pass |
| 10 | Filter lowongan berdasarkan tipe | Pilih "Remote" | Hanya tampil lowongan Remote | Hanya tampil lowongan bertipe Remote | ✅ Pass |
| 11 | Pencarian lowongan berdasarkan keyword | Ketik "React" | Tampil lowongan yang relevan dengan React | Muncul lowongan Frontend Developer dengan tag React | ✅ Pass |
| 12 | Pencarian tidak menemukan hasil | Keyword tidak relevan | Daftar kosong | Tidak ada lowongan yang tampil | ✅ Pass |

#### UC-03: CV Builder
| No | Skenario Uji | Input | Expected Output | Actual Output | Status |
|----|-------------|-------|-----------------|---------------|--------|
| 13 | Buka halaman CV Builder | Navigasi ke `/cv-builder` | Form dan preview tampil berdampingan | Form di kiri, preview CV di kanan tampil | ✅ Pass |
| 14 | Isi data diri pada form | Nama, email, universitas, jurusan, IPK | Preview CV terupdate real-time | Preview langsung menampilkan data yang diisi | ✅ Pass |
| 15 | Pilih template CV "Modern" | Klik template Modern | Warna aksen CV berubah ke hijau | Garis header CV berubah warna hijau (#00e5a0) | ✅ Pass |
| 16 | Pilih template CV "Minimal" | Klik template Minimal | Warna aksen CV berubah ke biru | Garis header CV berubah warna biru (#0ea5e9) | ✅ Pass |
| 17 | Pilih template CV "Bold" | Klik template Bold | Warna aksen CV berubah ke amber | Garis header CV berubah warna amber (#f59e0b) | ✅ Pass |
| 18 | Input skills dengan pemisah koma | "React, TypeScript, Figma" | Skills tampil sebagai badge terpisah di preview | Masing-masing skill tampil sebagai chip di preview | ✅ Pass |

#### UC-04: Tracking Progres Lamaran
| No | Skenario Uji | Input | Expected Output | Actual Output | Status |
|----|-------------|-------|-----------------|---------------|--------|
| 19 | Tampil daftar lamaran di dashboard | Buka `/dashboard` | Lamaran aktif tampil dengan status | 4 lamaran tampil dengan status masing-masing | ✅ Pass |
| 20 | Status "Menunggu" ditampilkan | Lamaran dengan status pending | Badge kuning "Menunggu" | Badge kuning tampil | ✅ Pass |
| 21 | Status "Interview" ditampilkan | Lamaran dengan status interview | Badge ungu "Interview" | Badge ungu tampil | ✅ Pass |
| 22 | Status "Diterima" ditampilkan | Lamaran dengan status accepted | Badge hijau "Diterima" | Badge hijau tampil | ✅ Pass |
| 23 | Akses dashboard tanpa login | Buka `/dashboard` tanpa session | Redirect ke halaman auth | Otomatis redirect ke `/auth` | ✅ Pass |

#### UC-05: Simulasi Interview
| No | Skenario Uji | Input | Expected Output | Actual Output | Status |
|----|-------------|-------|-----------------|---------------|--------|
| 24 | Buka halaman simulasi interview | Navigasi ke `/interview-sim` | Halaman intro dengan info simulasi | Tampil halaman intro dengan 3 info card dan tombol mulai | ✅ Pass |
| 25 | Mulai simulasi interview | Klik "Mulai Simulasi" | Pertanyaan pertama tampil | Pertanyaan pertama dari 8 pertanyaan tampil | ✅ Pass |
| 26 | Kirim jawaban | Isi jawaban, klik "Kirim Jawaban" | Muncul feedback AI dan skor | Feedback tampil dengan skor 78 dan 4 poin evaluasi | ✅ Pass |
| 27 | Lanjut ke pertanyaan berikutnya | Klik "Pertanyaan Berikutnya" | Pertanyaan selanjutnya tampil, progress bar update | Pertanyaan berubah, progress bar bertambah | ✅ Pass |
| 28 | Lewati pertanyaan | Klik "Lewati" | Pindah ke pertanyaan berikutnya tanpa submit | Pertanyaan berikutnya tampil | ✅ Pass |
| 29 | Tombol "Kirim Jawaban" saat kolom kosong | Tidak isi jawaban | Tombol disabled, tidak bisa klik | Tombol disabled dan tidak bisa diklik | ✅ Pass |

#### UC-06: Portofolio & Sertifikat Digital
| No | Skenario Uji | Input | Expected Output | Actual Output | Status |
|----|-------------|-------|-----------------|---------------|--------|
| 30 | Tampil halaman portofolio | Buka `/portfolio` | Grid item portofolio tampil | 4 item tampil dalam grid (proyek, sertifikat, pencapaian) | ✅ Pass |
| 31 | Filter berdasarkan tipe "Proyek" | Klik filter Proyek | Hanya tampil item bertipe proyek | Hanya 2 item proyek yang tampil | ✅ Pass |
| 32 | Filter berdasarkan tipe "Sertifikat" | Klik filter Sertifikat | Hanya tampil item sertifikat | Hanya 1 item sertifikat yang tampil | ✅ Pass |
| 33 | Buka modal tambah item | Klik tombol "+ Tambah Item" | Modal form muncul | Modal dengan form judul, tipe, deskripsi, tags tampil | ✅ Pass |
| 34 | Tutup modal | Klik tombol "✕" | Modal tertutup | Modal berhasil ditutup | ✅ Pass |

#### UC-07: Review & Rating Perusahaan
| No | Skenario Uji | Input | Expected Output | Actual Output | Status |
|----|-------------|-------|-----------------|---------------|--------|
| 35 | Tampil daftar perusahaan | Buka `/companies` | Daftar perusahaan dengan rating | 5 perusahaan tampil dengan rating bintang | ✅ Pass |
| 36 | Cari perusahaan berdasarkan nama | Ketik "Gojek" | Hanya Gojek yang tampil | Hanya card Gojek yang tampil | ✅ Pass |
| 37 | Cari perusahaan berdasarkan industri | Ketik "EdTech" | Perusahaan EdTech tampil | Ruangguru (EdTech) tampil | ✅ Pass |
| 38 | Tampil rating dan jumlah ulasan | - | Rating bintang dan jumlah ulasan tampil | Rating bintang (★) dan jumlah ulasan tampil | ✅ Pass |
| 39 | Badge verifikasi perusahaan | - | Perusahaan terverifikasi ada badge ✅ | Semua perusahaan verified menampilkan ✅ | ✅ Pass |

---

### Pengujian Non-Fungsional

#### Aspek Usability
| No | Aspek | Kriteria | Hasil | Status |
|----|-------|----------|-------|--------|
| 40 | Navigasi antar halaman | Semua link berfungsi dan berpindah halaman | Seluruh link navigasi berfungsi tanpa error | ✅ Pass |
| 41 | Responsif tampilan | UI tidak pecah pada lebar > 768px | Tampilan rapi di layar desktop dan laptop | ✅ Pass |
| 42 | Feedback loading | Tombol submit menampilkan status loading | Tombol berubah menjadi "⏳ Memproses..." saat request | ✅ Pass |
| 43 | Pesan error ramah pengguna | Error ditampilkan dalam Bahasa Indonesia | Semua pesan error ditampilkan dalam Bahasa Indonesia | ✅ Pass |
| 44 | Konsistensi desain | Warna, font, dan komponen konsisten | Design system dengan CSS variables konsisten di semua halaman | ✅ Pass |

#### Aspek Security
| No | Aspek | Kriteria | Hasil | Status |
|----|-------|----------|-------|--------|
| 45 | Proteksi halaman dashboard | Dashboard tidak bisa diakses tanpa login | Redirect otomatis ke `/auth` jika tidak ada session | ✅ Pass |
| 46 | RLS Supabase | User hanya bisa akses data miliknya sendiri | Row Level Security aktif di semua tabel | ✅ Pass |
| 47 | Environment variables | Credential tidak ter-expose di client | Env vars tersimpan di Vercel, tidak ada di kode publik | ✅ Pass |

#### Aspek Performance
| No | Aspek | Kriteria | Hasil | Status |
|----|-------|----------|-------|--------|
| 48 | Build berhasil | Tidak ada error saat `npm run build` | Build sukses di Vercel tanpa error | ✅ Pass |
| 49 | Halaman landing load | Landing page tampil tanpa blank screen | Halaman tampil dengan animasi float cards | ✅ Pass |
| 50 | TypeScript type check | Tidak ada type error | Semua type error terselesaikan sebelum deploy | ✅ Pass |

---

## 🚀 Deployment

Aplikasi di-deploy menggunakan **Vercel** dengan konfigurasi:

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Node.js Version | 18.x |
| Environment | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |

---

## 👨‍💻 Developer

| Nama | NIM | Universitas |
|------|-----|-------------|
| Dzulhi Kurniawan Adha | - | Universitas Muhammadiyah Malang |

---

## 📄 Lisensi

Project ini dibuat untuk keperluan tugas **Daily Project 6** mata kuliah Rekayasa Perangkat Lunak.