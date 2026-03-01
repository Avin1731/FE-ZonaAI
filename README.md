# VeriFakta — AI Hoax Detector

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF008F?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

**Platform verifikasi berita berbasis AI untuk membedakan fakta dan hoaks secara cepat dan akurat.**

</div>

---

## 🚀 Ringkasan Proyek

**VeriFakta** adalah platform deteksi hoaks bertenaga AI yang dibangun untuk membantu masyarakat Indonesia memverifikasi kebenaran suatu berita atau informasi secara instan.

Pengguna cukup memasukkan teks berita atau URL, dan sistem AI akan menganalisis konten tersebut lalu memberikan verdict: **HOAKS**, **FAKTA**, atau **DIRAGUKAN** — lengkap dengan persentase confidence, alasan penilaian, dan sumber rujukan terpercaya.

VeriFakta dibangun di atas **Next.js App Router** dengan dark theme yang konsisten, animasi scroll yang halus via Framer Motion, dan antarmuka yang responsif menggunakan Tailwind CSS v4 + shadcn/ui.

---

## 🛠️ Tech Stack

| Lapisan | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **Styling** | Tailwind CSS v4 |
| **Component Library** | shadcn/ui |
| **Animasi** | Framer Motion |
| **Icons** | Lucide React |
| **Font** | Geist (Vercel) |
| **Language** | TypeScript 5 |

---

## ✅ Fitur & Progress Halaman

| Halaman | Route | Status | Deskripsi |
|---|---|---|---|
| Landing Page | `/` | ✅ Selesai | Hero, Tentang, Fitur, Statistik, FAQ, CTA — dengan scroll reveal animation |
| AI Detector | `/chatbot` | ✅ Selesai | Wizard 3-stage: input teks/URL → loading analyzer → hasil verdict dengan confidence % |
| Artikel | `/article` | ✅ Selesai | Grid 9 artikel berita, filter HOAKS/FAKTA/DIRAGUKAN, pencarian real-time |
| Login | `/login` | ✅ Selesai | Halaman coming soon full-screen standalone |
| Cara Pemakaian | `/cara-pemakaian` | ✅ Selesai | Panduan penggunaan platform |
| Kontributor | `/contributor` | ✅ Selesai | Halaman tim dan kontributor proyek |
| Kebijakan Privasi | `/privacy` | ✅ Selesai | 6 seksi kebijakan privasi dengan motion fade-in |
| Syarat & Ketentuan | `/terms` | ✅ Selesai | 6 seksi termasuk AI disclaimer |

### Fitur Teknis

- 🔍 **Smart Mock AI** — hasil analisis disesuaikan berdasarkan kata kunci input
- 🎯 **3-Stage Wizard** — alur Input → Loading (SVG progress ring) → Result yang mulus
- 🎨 **Dark Theme Konsisten** — CSS variables terpusat (`--background`, `--primary`, `--card`)
- 📱 **Responsive** — mobile-first dengan hamburger menu + Sheet navigation
- ✨ **Scroll Animations** — `ScrollReveal` + `FadeIn` dengan `whileInView` (re-animate on scroll)
- 🔗 **Anchor Navigation** — smooth scroll ke section dengan `handleNavClick`

---

## ⚙️ Persyaratan Sistem

- **Node.js** versi `18.17` atau lebih baru
- **npm** / **pnpm** / **yarn**

---

## 💻 Cara Instalasi & Penggunaan

### 1. Clone Repository

```bash
git clone <URL_REPO>
cd verifakta
```

### 2. Install Dependensi

```bash
npm install
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 4. Build untuk Production

```bash
npm run build
npm start
```

---

## 📁 Struktur Proyek

```
src/
├── app/                        # Next.js App Router
│   ├── (main)/                 # Layout dengan Header + Footer
│   │   ├── page.tsx            # Landing page
│   │   ├── article/            # Halaman artikel berita
│   │   ├── cara-pemakaian/     # Panduan penggunaan
│   │   ├── contributor/        # Halaman tim
│   │   ├── privacy/            # Kebijakan privasi
│   │   └── terms/              # Syarat & ketentuan
│   ├── (chat)/                 # Layout full-screen (tanpa Header/Footer)
│   │   └── chatbot/            # AI hoax detector wizard
│   ├── login/                  # Halaman login (standalone)
│   ├── globals.css             # CSS variables & dark theme
│   └── layout.tsx              # Root layout
├── components/
│   ├── landing/                # Komponen section landing page
│   ├── layout/                 # Header, Footer
│   ├── shared/                 # FadeIn, ScrollReveal
│   └── ui/                     # shadcn/ui components
└── constants/                  # Data statis
    ├── team.ts                 # Data tim (single source of truth)
    └── ...
```

---

## 👥 Tim Kontributor

| Badge | GitHub | Peran | Fokus |
|---|---|---|---|
| `AI / ML` | [@Ahsanifadhli](https://github.com/Ahsanifadhli) | AI & ML Engineer | Model RAG, fine-tuning LLM deteksi hoaks, pipeline training |
| `Frontend` | [@Avin1731](https://github.com/Avin1731) | Frontend Engineer | UI/UX Next.js, chatbot interface, Framer Motion |
| `Backend` | [@NaelSucksAtCoding](https://github.com/NaelSucksAtCoding) | Backend Engineer | REST API, database, integrasi LLM endpoint |

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

© 2026 VeriFakta — Melawan hoaks dengan teknologi AI.
