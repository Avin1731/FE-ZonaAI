'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeIn from '@/components/shared/FadeIn';

const sections = [
  {
    title: 'Data yang Dikumpulkan',
    content:
      'VeriFakta mengumpulkan data yang Anda berikan secara langsung saat menggunakan layanan, termasuk teks berita atau klaim yang Anda kirimkan untuk diverifikasi. Kami tidak mengumpulkan data pribadi yang dapat mengidentifikasi Anda secara langsung kecuali Anda memilih untuk mendaftar akun. Data analisis yang dikirimkan dapat disimpan secara anonim untuk keperluan peningkatan model AI.',
  },
  {
    title: 'Penggunaan Data',
    content:
      'Data yang dikumpulkan digunakan untuk: (1) menyediakan layanan verifikasi berita berbasis AI, (2) meningkatkan akurasi dan performa model deteksi hoaks, (3) menganalisis pola penggunaan platform secara agregat dan anonim, dan (4) memenuhi kewajiban hukum yang berlaku. Kami tidak menjual data Anda kepada pihak ketiga untuk keperluan komersial.',
  },
  {
    title: 'Keamanan Data',
    content:
      'Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi data Anda dari akses tidak sah, pengungkapan, perubahan, atau penghancuran. Koneksi ke platform dilindungi dengan enkripsi HTTPS/TLS. Meskipun demikian, tidak ada sistem keamanan yang sepenuhnya bebas risiko, dan kami tidak dapat menjamin keamanan absolut.',
  },
  {
    title: 'Layanan Pihak Ketiga',
    content:
      'VeriFakta dapat menggunakan layanan pihak ketiga untuk mendukung operasional platform, termasuk penyedia layanan AI, infrastruktur cloud, dan alat analitik. Setiap penyedia layanan pihak ketiga dipilih dengan mempertimbangkan standar privasi yang memadai. Kami tidak bertanggung jawab atas praktik privasi layanan eksternal yang ditautkan dari platform ini.',
  },
  {
    title: 'Cookies',
    content:
      'Platform ini dapat menggunakan cookies dan teknologi penyimpanan lokal serupa untuk menjaga preferensi pengguna dan meningkatkan pengalaman browsing. Anda dapat mengonfigurasi browser Anda untuk menolak cookies, namun beberapa fitur platform mungkin tidak berfungsi secara optimal.',
  },
  {
    title: 'Perubahan Kebijakan',
    content:
      'Kami berhak memperbarui Kebijakan Privasi ini sewaktu-waktu. Perubahan material akan diumumkan melalui platform atau saluran komunikasi resmi kami. Dengan terus menggunakan layanan setelah perubahan berlaku, Anda dianggap menyetujui kebijakan yang telah diperbarui. Tanggal efektif kebijakan ini adalah 28 Februari 2026.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24">
      <section className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-indigo-400">
              KEBIJAKAN PRIVASI
            </div>
            <h1 className="mb-4 text-4xl font-bold text-slate-50 sm:text-5xl">
              Kebijakan Privasi
            </h1>
            <p className="mx-auto max-w-xl text-slate-400">
              Bagaimana VeriFakta mengumpulkan, menggunakan, dan melindungi data Anda.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <FadeIn key={i} delay={i * 0.1} duration={0.5}>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                  <h2 className="mb-3 text-lg font-semibold text-slate-100">
                    {section.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {section.content}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-12 text-center">
            <Link
              href="/"
              className="text-sm text-slate-500 transition-colors hover:text-slate-300"
            >
              ← Kembali ke Beranda
            </Link>
          </FadeIn>

        </div>
      </section>
    </div>
  );
}