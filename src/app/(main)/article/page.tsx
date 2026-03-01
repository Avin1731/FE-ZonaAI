'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Calendar, Globe, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';

type Label = 'SEMUA' | 'HOAKS' | 'FAKTA' | 'DIRAGUKAN';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  source: string;
  date: string;
  label: Exclude<Label, 'SEMUA'>;
  url: string;
  confidence: number;
}

const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Vaksin COVID-19 Menyebabkan Perubahan DNA Permanen pada Manusia',
    excerpt: 'Klaim beredar luas di media sosial bahwa vaksin mRNA COVID-19 dapat mengubah DNA manusia secara permanen. Hasil analisis menunjukkan klaim ini tidak didukung bukti ilmiah.',
    source: 'WhatsApp Viral',
    date: '1 Mar 2026',
    label: 'HOAKS',
    url: '#',
    confidence: 97,
  },
  {
    id: 2,
    title: 'Indonesia Resmi Menjadi Anggota OECD pada Awal 2025',
    excerpt: 'Pemerintah Indonesia mengonfirmasi keanggotaan penuh dalam Organization for Economic Cooperation and Development setelah proses aksesi yang berlangsung beberapa tahun.',
    source: 'Kompas.com',
    date: '28 Feb 2026',
    label: 'FAKTA',
    url: '#',
    confidence: 95,
  },
  {
    id: 3,
    title: 'Bawang Putih Tunggal Dapat Menyembuhkan Kanker Stadium 4 dalam Seminggu',
    excerpt: 'Postingan viral mengklaim bawang putih tunggal memiliki zat kimia yang mampu membunuh sel kanker stadium 4 secara total. Klaim ini belum pernah diverifikasi secara klinis.',
    source: 'Facebook Post',
    date: '28 Feb 2026',
    label: 'HOAKS',
    url: '#',
    confidence: 91,
  },
  {
    id: 4,
    title: 'Timnas Indonesia Lolos ke Putaran Ketiga Kualifikasi Piala Dunia 2026',
    excerpt: 'Tim nasional sepak bola Indonesia berhasil melaju ke babak ketiga kualifikasi Piala Dunia setelah meraih poin cukup dari pertandingan di Grup C.',
    source: 'CNN Indonesia',
    date: '27 Feb 2026',
    label: 'FAKTA',
    url: '#',
    confidence: 99,
  },
  {
    id: 5,
    title: 'Pemerintah Akan Hapus Subsidi BBM Seluruhnya Mulai April 2026',
    excerpt: 'Beredar kabar pemerintah berencana mencabut seluruh subsidi bahan bakar minyak mulai April 2026. Informasi ini tidak memiliki sumber resmi yang dapat dikonfirmasi.',
    source: 'Telegram Group',
    date: '27 Feb 2026',
    label: 'DIRAGUKAN',
    url: '#',
    confidence: 72,
  },
  {
    id: 6,
    title: 'Bank Indonesia Naikkan Suku Bunga Acuan ke 6.25% pada Rapat Februari',
    excerpt: 'Bank Indonesia memutuskan untuk mempertahankan atau menyesuaikan suku bunga acuan BI-Rate dalam Rapat Dewan Gubernur bulan Februari 2026.',
    source: 'Bisnis.com',
    date: '26 Feb 2026',
    label: 'FAKTA',
    url: '#',
    confidence: 94,
  },
  {
    id: 7,
    title: 'Minum Air Hangat Campur Garam Setiap Pagi Cegah Stroke',
    excerpt: 'Konten video berdurasi pendek mengklaim bahwa minum air garam hangat setiap pagi secara rutin dapat mencegah stroke. Tidak ada penelitian peer-reviewed yang mendukung klaim ini.',
    source: 'TikTok Viral',
    date: '25 Feb 2026',
    label: 'HOAKS',
    url: '#',
    confidence: 88,
  },
  {
    id: 8,
    title: 'Rencana Pemindahan Ibu Kota ke Nusantara Ditunda Hingga 2027',
    excerpt: 'Sejumlah sumber menyebutkan pemindahan pemerintahan ke IKN Nusantara mengalami penundaan, namun pernyataan resmi dari pemerintah masih simpang siur.',
    source: 'Media Sosial',
    date: '24 Feb 2026',
    label: 'DIRAGUKAN',
    url: '#',
    confidence: 65,
  },
  {
    id: 9,
    title: 'BMKG Konfirmasi Peningkatan Aktivitas Seismik di Zona Megathrust Selatan Jawa',
    excerpt: 'Badan Meteorologi, Klimatologi, dan Geofisika merilis laporan resmi mengenai peningkatan aktivitas seismik di kawasan Megathrust Selatan Jawa dan meminta masyarakat waspada.',
    source: 'BMKG.go.id',
    date: '23 Feb 2026',
    label: 'FAKTA',
    url: '#',
    confidence: 98,
  },
];

const LABEL_CONFIG = {
  HOAKS: {
    bg: 'bg-red-500/15',
    border: 'border-red-500/30',
    text: 'text-red-400',
    icon: ShieldAlert,
    dot: 'bg-red-500',
  },
  FAKTA: {
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    icon: ShieldCheck,
    dot: 'bg-emerald-500',
  },
  DIRAGUKAN: {
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    icon: ShieldQuestion,
    dot: 'bg-amber-500',
  },
};

const FILTER_LABELS: Label[] = ['SEMUA', 'HOAKS', 'FAKTA', 'DIRAGUKAN'];

const labelCount = (label: Exclude<Label, 'SEMUA'>) =>
  MOCK_ARTICLES.filter((a) => a.label === label).length;

export default function ArticlePage() {
  const [activeLabel, setActiveLabel] = useState<Label>('SEMUA');
  const [query, setQuery] = useState('');

  const filtered = MOCK_ARTICLES.filter((a) => {
    const matchLabel = activeLabel === 'SEMUA' || a.label === activeLabel;
    const matchQuery =
      query.trim() === '' ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      a.source.toLowerCase().includes(query.toLowerCase());
    return matchLabel && matchQuery;
  });

  return (
    <div className="min-h-screen bg-slate-950 pt-24">
      <section className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-10 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-indigo-400">
              HASIL DETEKSI • AI-POWERED
            </div>
            <h1 className="mb-3 text-4xl font-bold text-slate-50 sm:text-5xl">
              Artikel &amp; Hasil Deteksi
            </h1>
            <p className="mx-auto max-w-xl text-slate-400">
              Kumpulan berita dan klaim yang telah dianalisis oleh sistem AI VeriFakta beserta label kebenaran yang dihasilkan.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="mb-8 grid grid-cols-3 gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
          >
            {(['HOAKS', 'FAKTA', 'DIRAGUKAN'] as const).map((l) => {
              const cfg = LABEL_CONFIG[l];
              const Icon = cfg.icon;
              return (
                <div key={l} className="flex items-center justify-center gap-3">
                  <Icon className={`size-5 ${cfg.text}`} />
                  <div className="text-center">
                    <p className={`text-xl font-bold ${cfg.text}`}>{labelCount(l)}</p>
                    <p className="text-xs text-slate-500">{l}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari judul, sumber..."
                className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30"
              />
            </div>

            {/* Label filter tabs */}
            <div className="flex gap-2 flex-wrap">
              {FILTER_LABELS.map((lbl) => (
                <button
                  key={lbl}
                  onClick={() => setActiveLabel(lbl)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all border ${
                    activeLabel === lbl
                      ? lbl === 'SEMUA'
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : `${LABEL_CONFIG[lbl as Exclude<Label, 'SEMUA'>].bg} ${LABEL_CONFIG[lbl as Exclude<Label, 'SEMUA'>].border} ${LABEL_CONFIG[lbl as Exclude<Label, 'SEMUA'>].text}`
                      : 'border-slate-700 bg-transparent text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Article grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center text-slate-500"
              >
                Tidak ada artikel yang cocok dengan filter atau pencarian Anda.
              </motion.div>
            ) : (
              <motion.div
                key={activeLabel + query}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((article, i) => {
                  const cfg = LABEL_CONFIG[article.label];
                  const Icon = cfg.icon;
                  return (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35 }}
                      className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition-colors hover:border-slate-700"
                    >
                      {/* Label badge */}
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                          <Icon className="size-3" />
                          {article.label}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Akurasi {article.confidence}%
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="mb-2 flex-1 text-sm font-semibold leading-snug text-slate-100 line-clamp-3">
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="mb-4 text-xs leading-relaxed text-slate-400 line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-800 pt-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Globe className="size-3" />
                            {article.source}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-600">
                            <Calendar className="size-3" />
                            {article.date}
                          </span>
                        </div>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-[11px] font-medium text-indigo-400 transition-colors hover:bg-indigo-500/20"
                        >
                          Detail
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result count */}
          {filtered.length > 0 && (
            <p className="mt-6 text-center text-xs text-slate-600">
              Menampilkan {filtered.length} dari {MOCK_ARTICLES.length} artikel
            </p>
          )}

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link href="/" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
              ← Kembali ke Beranda
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
