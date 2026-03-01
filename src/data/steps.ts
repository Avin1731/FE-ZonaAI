import { type LucideIcon, FileText, Cpu, Search, CheckCircle } from 'lucide-react';

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const steps: Step[] = [
  {
    number: 1,
    title: 'Masukkan Teks Berita',
    description:
      'Salin dan tempelkan teks berita, klaim, atau informasi yang ingin Anda verifikasi ke dalam chatbot VeriFakta.',
    icon: FileText,
  },
  {
    number: 2,
    title: 'AI Memproses & Menganalisis',
    description:
      'Model LLM kami menganalisis teks secara mendalam — mengidentifikasi klaim utama, fakta pendukung, dan potensi misinformasi.',
    icon: Cpu,
  },
  {
    number: 3,
    title: 'Pencocokan dengan Basis Data',
    description:
      'Melalui teknologi RAG, sistem membandingkan klaim dengan ribuan fakta terverifikasi dari sumber terpercaya dan database kami.',
    icon: Search,
  },
  {
    number: 4,
    title: 'Hasil Verifikasi Ditampilkan',
    description:
      'Anda mendapatkan klasifikasi (Fakta, Hoaks, Opini, atau Misleading) beserta tingkat kepercayaan dan penjelasan detail.',
    icon: CheckCircle,
  },
];
