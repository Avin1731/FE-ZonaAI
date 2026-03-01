export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Apa itu VeriFakta?',
    answer:
      'VeriFakta adalah platform verifikasi berita berbasis AI yang menggunakan teknologi LLM (Large Language Model) dan RAG (Retrieval-Augmented Generation) untuk membantu pengguna membedakan fakta dan hoaks secara cepat dan akurat.',
  },
  {
    question: 'Bagaimana cara kerja AI VeriFakta?',
    answer:
      'VeriFakta menganalisis teks berita yang Anda masukkan, kemudian membandingkannya dengan basis data fakta terverifikasi menggunakan teknik RAG. Hasilnya berupa klasifikasi: Fakta, Hoaks, Opini, atau Misleading, disertai penjelasan.',
  },
  {
    question: 'Seberapa akurat hasil verifikasi VeriFakta?',
    answer:
      'Tingkat akurasi rata-rata VeriFakta mencapai 92,5% berdasarkan pengujian terhadap ribuan artikel berita. Namun, kami menyarankan pengguna tetap melakukan verifikasi silang dari sumber terpercaya.',
  },
  {
    question: 'Apakah data saya aman?',
    answer:
      'Ya, VeriFakta tidak menyimpan teks berita yang Anda masukkan secara permanen. Semua proses verifikasi dilakukan secara real-time dan data dihapus setelah sesi berakhir.',
  },
  {
    question: 'Apakah VeriFakta gratis digunakan?',
    answer:
      'Saat ini VeriFakta tersedia secara gratis untuk penggunaan dasar. Fitur premium dengan batas penggunaan yang lebih tinggi dan analisis mendalam akan tersedia di masa mendatang.',
  },
  {
    question: 'Bahasa apa saja yang didukung?',
    answer:
      'Saat ini VeriFakta fokus mendukung Bahasa Indonesia. Dukungan untuk bahasa lain seperti Inggris dan Melayu sedang dalam tahap pengembangan.',
  },
];
