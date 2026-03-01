'use client';

import Link from 'next/link';
import FadeIn from '@/components/shared/FadeIn'; 

const sections = [
  {
    title: 'Penerimaan Syarat',
    content: 'Dengan mengakses atau menggunakan layanan VeriFakta, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak menyetujui syarat-syarat ini, mohon untuk tidak menggunakan layanan kami. Syarat ini berlaku bagi semua pengguna, pengunjung, dan pihak lain yang mengakses platform.',
  },
  {
    title: 'Penggunaan Layanan',
    content: 'VeriFakta menyediakan alat verifikasi berita berbasis AI untuk penggunaan pribadi dan non-komersial. Anda setuju untuk menggunakan layanan hanya untuk tujuan yang sah dan tidak melanggar hukum yang berlaku. Dilarang keras menyalahgunakan layanan untuk menyebarkan konten berbahaya, melakukan serangan terhadap infrastruktur, atau mencoba mengakses data pengguna lain.',
  },
  {
    title: 'Batasan Tanggung Jawab Layanan AI',
    content: 'Hasil analisis yang diberikan oleh sistem AI VeriFakta bersifat informatif semata dan BUKAN merupakan keputusan hukum, jurnalistik resmi, atau pernyataan faktual yang dapat dijadikan dasar hukum. Akurasi deteksi hoaks bergantung pada model AI yang terus berkembang dan mungkin tidak sempurna. VeriFakta tidak bertanggung jawab atas keputusan yang diambil berdasarkan hasil analisis platform ini. Pengguna dianjurkan untuk selalu melakukan verifikasi independen melalui sumber terpercaya.',
  },
  {
    title: 'Kekayaan Intelektual',
    content: 'Seluruh konten, desain, kode sumber, logo, dan materi lainnya yang terdapat di platform VeriFakta adalah milik tim pengembang VeriFakta dan dilindungi oleh hak kekayaan intelektual yang berlaku. Anda tidak diperkenankan mereproduksi, mendistribusikan, atau membuat karya turunan dari materi tersebut tanpa izin tertulis sebelumnya.',
  },
  {
    title: 'Penafian Jaminan',
    content: 'Layanan VeriFakta disediakan "sebagaimana adanya" (as-is) tanpa jaminan apapun, baik tersurat maupun tersirat. Kami tidak menjamin bahwa layanan akan selalu tersedia, bebas dari kesalahan, atau memenuhi ekspektasi spesifik Anda. Penggunaan layanan sepenuhnya merupakan risiko Anda sendiri.',
  },
  {
    title: 'Perubahan Syarat',
    content: 'Kami berhak mengubah Syarat & Ketentuan ini kapan saja dengan atau tanpa pemberitahuan sebelumnya. Perubahan material akan diumumkan melalui platform. Dengan terus menggunakan layanan setelah perubahan berlaku, Anda dianggap telah menerima syarat yang telah diperbarui. Tanggal efektif syarat ini adalah 28 Februari 2026.',
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24">
      <section className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">

          <FadeIn className="mb-12 text-center" duration={0.5}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-indigo-400">
              SYARAT &amp; KETENTUAN
            </div>
            <h1 className="mb-4 text-4xl font-bold text-slate-50 sm:text-5xl">
              Syarat &amp; Ketentuan
            </h1>
            <p className="mx-auto max-w-xl text-slate-400">
              Aturan penggunaan platform dan ketentuan layanan AI VeriFakta.
            </p>
          </FadeIn>

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