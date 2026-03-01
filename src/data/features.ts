import { ShieldCheck, Bot, BarChart3, Users, Zap } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const features: Feature[] = [
  {
    title: 'Verifikasi Berbasis RAG',
    description:
      'Menggunakan Retrieval-Augmented Generation untuk membandingkan berita dengan basis data fakta terverifikasi, menghasilkan jawaban yang akurat dan kontekstual.',
    icon: ShieldCheck,
  },
  {
    title: 'Chatbot AI Interaktif',
    description:
      'Antarmuka chatbot modern yang memungkinkan Anda bertanya langsung dan mendapat verifikasi secara real-time dalam format percakapan natural.',
    icon: Bot,
  },
  {
    title: 'Dashboard Statistik',
    description:
      'Visualisasi data performa AI secara transparan — lihat akurasi deteksi dan distribusi kategori konten yang telah dianalisis.',
    icon: BarChart3,
  },
  {
    title: 'Multi-Kategori Klasifikasi',
    description:
      'Tidak hanya Fakta dan Hoaks — VeriFakta juga mendeteksi konten Opini dan Misleading untuk analisis yang lebih komprehensif.',
    icon: Users,
  },
  {
    title: 'Respons Cepat & Akurat',
    description:
      'Proses verifikasi dalam hitungan detik dengan tingkat akurasi rata-rata 92,5% berdasarkan pengujian ribuan artikel berita.',
    icon: Zap,
  },
];
