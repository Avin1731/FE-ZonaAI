export interface TeamMember {
  id: string;
  githubUsername: string;
  badge: string;
  roleTitle: string;
  tasks: string[];
}

export const TEAM_DATA: TeamMember[] = [
  {
    id: '1',
    githubUsername: 'Ahsanifadhli',
    badge: 'AI / ML',
    roleTitle: 'AI & ML Engineer',
    tasks: [
      'Optimasi model RAG untuk verifikasi fakta',
      'Fine-tuning LLM untuk deteksi hoaks Bahasa Indonesia',
      'Pengembangan pipeline data training',
      'Evaluasi dan benchmarking akurasi model',
    ],
  },
    {
    id: '2',
    githubUsername: 'Avin1731',
    badge: 'Frontend',
    roleTitle: 'Frontend Engineer',
    tasks: [
      'Implementasi UI/UX dengan Next.js dan Tailwind',
      'Integrasi API pada sisi klien',
      'Pengembangan chatbot interface',
      'Responsivitas dan animasi Framer Motion',
    ],
  },
  {
    id: '3',
    githubUsername: 'NaelSucksAtCoding',
    badge: 'Backend',
    roleTitle: 'Backend Engineer',
    tasks: [
      'Desain dan implementasi REST API',
      'Manajemen database dan skema data',
      'Integrasi LLM API endpoint',
      'Optimasi performa dan caching',
    ],
  },
];
