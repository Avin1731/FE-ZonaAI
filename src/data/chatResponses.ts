export interface ChatResponse {
  id: string;
  message: string;
  verdict: 'fakta' | 'hoaks' | 'opini' | 'misleading';
  confidence: number;
}

export const dummyResponses: ChatResponse[] = [
  {
    id: '1',
    message:
      'Berdasarkan analisis kami, klaim ini terverifikasi sebagai **FAKTA**. Informasi ini didukung oleh data resmi dari Kementerian Kesehatan RI dan telah dikonfirmasi oleh beberapa sumber terpercaya lainnya.',
    verdict: 'fakta',
    confidence: 96,
  },
  {
    id: '2',
    message:
      'Setelah membandingkan dengan basis data kami, klaim ini teridentifikasi sebagai **HOAKS**. Informasi serupa telah dibantah oleh WHO dan tidak ditemukan bukti ilmiah yang mendukung klaim tersebut.',
    verdict: 'hoaks',
    confidence: 94,
  },
  {
    id: '3',
    message:
      'Konten yang Anda kirimkan terklasifikasi sebagai **OPINI**. Ini merupakan pandangan pribadi penulis dan bukan merupakan fakta terverifikasi. Disarankan untuk membedakan antara opini dan berita faktual.',
    verdict: 'opini',
    confidence: 89,
  },
  {
    id: '4',
    message:
      'Analisis kami menunjukkan bahwa informasi ini bersifat **MISLEADING** (menyesatkan). Meskipun sebagian data benar, konteks dan kesimpulan yang ditarik tidak akurat dan dapat menimbulkan salah interpretasi.',
    verdict: 'misleading',
    confidence: 87,
  },
  {
    id: '5',
    message:
      'Klaim ini terverifikasi sebagai **FAKTA**. Data statistik yang disebutkan sesuai dengan laporan BPS terbaru dan telah dikonfirmasi oleh beberapa media kredibel.',
    verdict: 'fakta',
    confidence: 95,
  },
  {
    id: '6',
    message:
      'Peringatan: konten ini teridentifikasi sebagai **HOAKS**. Gambar yang digunakan terdeteksi sebagai hasil manipulasi/deepfake, dan narasi yang menyertai tidak memiliki sumber yang valid.',
    verdict: 'hoaks',
    confidence: 92,
  },
];

let responseIndex = 0;

export function getNextDummyResponse(): ChatResponse {
  const response = dummyResponses[responseIndex];
  responseIndex = (responseIndex + 1) % dummyResponses.length;
  return response;
}
