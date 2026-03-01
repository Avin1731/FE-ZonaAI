'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  Send,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Link2,
  FileText,
  UserCircle,
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

type Verdict = 'HOAKS' | 'FAKTA' | 'DIRAGUKAN';
type Stage = 'input' | 'loading' | 'result';

interface AnalysisResult {
  verdict: Verdict;
  confidence: number;
  reasoning: string;
  sources: { label: string; url: string }[];
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_POOL: AnalysisResult[] = [
  {
    verdict: 'HOAKS',
    confidence: 88,
    reasoning:
      'Informasi yang diberikan mengandung klaim yang berlebihan dan tidak didukung oleh data medis resmi. Pola bahasa yang digunakan cocok dengan teknik manipulasi emosional yang sering ditemukan pada artikel hoaks terorganisir.',
    sources: [
      { label: 'Kominfo — Klarifikasi Isu Terkait', url: 'https://kominfo.go.id' },
      { label: 'TurnBackHoax — Laporan Investigasi Fakta', url: 'https://turnbackhoax.id' },
    ],
  },
  {
    verdict: 'FAKTA',
    confidence: 96,
    reasoning:
      'Klaim ini didukung oleh data resmi dari Kementerian Kesehatan RI dan dikonfirmasi oleh beberapa sumber terpercaya. Tidak ditemukan indikasi manipulasi atau fabrikasi pada informasi yang disampaikan.',
    sources: [
      { label: 'Kemenkes RI — Siaran Pers Resmi', url: 'https://kemkes.go.id' },
      { label: 'WHO Indonesia — Fact Sheet', url: 'https://who.int' },
    ],
  },
  {
    verdict: 'DIRAGUKAN',
    confidence: 67,
    reasoning:
      'Sebagian data yang dikutip memiliki dasar, namun konteks dan kesimpulan yang diambil tidak akurat. Narasi berpotensi menimbulkan salah interpretasi karena menghilangkan informasi krusial dari sumber aslinya.',
    sources: [
      { label: 'Reuters Fact Check — Related Report', url: 'https://reuters.com/fact-check' },
      { label: 'Cekfakta.com — Investigasi Terkait', url: 'https://cekfakta.com' },
    ],
  },
  {
    verdict: 'HOAKS',
    confidence: 93,
    reasoning:
      'Gambar atau klaim yang beredar bersama narasi terdeteksi sebagai hasil manipulasi digital. Narasi yang menyertai tidak memiliki sumber valid dan bertentangan dengan pernyataan resmi lembaga terkait.',
    sources: [
      { label: 'Mafindo — Hoaks Terbaru', url: 'https://mafindo.or.id' },
      { label: 'AFP Fact Check Indonesia', url: 'https://factcheck.afp.com' },
    ],
  },
  {
    verdict: 'FAKTA',
    confidence: 94,
    reasoning:
      'Data statistik yang disebutkan sesuai dengan laporan BPS terbaru. Klaim telah dikonfirmasi oleh beberapa media kredibel dan tidak ditemukan kontraindikasi dari sumber-sumber terpercaya.',
    sources: [
      { label: 'BPS RI — Laporan Resmi', url: 'https://bps.go.id' },
      { label: 'Kompas.com — Pengecekan Fakta', url: 'https://kompas.com' },
    ],
  },
];

const getSmartMockResult = (input: string): AnalysisResult => {
  const lower = input.toLowerCase();
  
  if (lower.includes('vaksin') || lower.includes('medis') || lower.includes('dna')) return MOCK_POOL[0];
  if (lower.includes('oecd') || lower.includes('kemenkes') || lower.includes('resmi')) return MOCK_POOL[1];
  if (lower.includes('gambar') || lower.includes('manipulasi') || lower.includes('edit')) return MOCK_POOL[3];
  if (lower.includes('statistik') || lower.includes('bps') || lower.includes('data')) return MOCK_POOL[4];

  let hash = 0;
  for (let i = 0; i < lower.length; i++) {
    hash = lower.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % MOCK_POOL.length;
  return MOCK_POOL[index];
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const LOADING_STEPS = [
  'Menganalisis struktur teks input...',
  'Memeriksa basis data referensi & fakta...',
  'Mencocokkan pola dengan dataset hoaks...',
  'Menghasilkan verifikasi akhir...',
];

const VERDICT_CONFIG: Record<
  Verdict,
  {
    icon: React.FC<{ className?: string }>;
    bigColor: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    borderLeft: string;
    label: string;
  }
> = {
  HOAKS: {
    icon: ShieldAlert,
    bigColor: 'text-red-400',
    badgeBg: 'bg-red-500/15',
    badgeBorder: 'border-red-500/40',
    badgeText: 'text-red-400',
    borderLeft: 'border-l-red-500',
    label: 'Indikasi Hoaks',
  },
  FAKTA: {
    icon: ShieldCheck,
    bigColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/15',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-400',
    borderLeft: 'border-l-emerald-500',
    label: 'Terverifikasi Fakta',
  },
  DIRAGUKAN: {
    icon: ShieldQuestion,
    bigColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/15',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-400',
    borderLeft: 'border-l-amber-500',
    label: 'Perlu Diragukan',
  },
};

// ─── Stage: Input ──────────────────────────────────────────────────────────────

function StageInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
  };

  const isUrl = text.trim().startsWith('http');

  return (
    <motion.div
      key="input"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-5"
    >
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10">
          <ShieldCheck className="h-7 w-7 text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-50 sm:text-3xl">VeriFakta AI</h1>
        <p className="mt-1.5 text-sm text-slate-400">
          Masukkan teks berita atau URL untuk diverifikasi secara instan.
        </p>
      </div>

      <div className="flex gap-3 text-xs">
        <span className={`flex items-center gap-1.5 transition-colors ${!isUrl ? 'text-indigo-400' : 'text-slate-600'}`}>
          <FileText className="size-3.5" />
          Teks Berita
        </span>
        <span className="text-slate-700">|</span>
        <span className={`flex items-center gap-1.5 transition-colors ${isUrl ? 'text-indigo-400' : 'text-slate-600'}`}>
          <Link2 className="size-3.5" />
          URL / Link
        </span>
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit();
        }}
        placeholder="Masukkan teks berita atau tempel link URL di sini..."
        rows={5}
        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
      />

      <p className="text-right text-xs text-slate-700">Ctrl+Enter untuk analisis</p>

      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
        Analisis Sekarang
      </button>

      <div className="space-y-2">
        <p className="text-xs text-slate-700">Coba contoh:</p>
        {[
          'Vaksin COVID-19 menyebabkan perubahan DNA permanen pada manusia',
          'Indonesia resmi bergabung dengan OECD pada awal 2025',
        ].map((example) => (
          <button
            key={example}
            onClick={() => setText(example)}
            className="block w-full rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-left text-xs text-slate-600 transition hover:border-slate-700 hover:text-slate-300"
          >
            &ldquo;{example}&rdquo;
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Stage: Loading ─────────────────────────────────────────────────────────────

function StageLoading({ inputText }: { inputText: string }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const total = LOADING_STEPS.length;
  const circumference = 2 * Math.PI * 34;

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev + 1 >= total) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
      setProgress((prev) => Math.min(prev + 100 / total, 100));
    }, 600);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col items-center gap-6 py-4"
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#1e1f4a" strokeWidth="6" />
          <motion.circle
            cx="40" cy="40" r="34"
            fill="none" stroke="#6366f1" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * (1 - progress / 100) }}
            transition={{ duration: 0.4 }}
          />
        </svg>
        <Sparkles className="h-7 w-7 text-indigo-400" />
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-slate-200">AI sedang menganalisis...</p>
        <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
          &ldquo;{inputText.slice(0, 60)}{inputText.length > 60 ? '...' : ''}&rdquo;
        </p>
      </div>

      <div className="w-full space-y-2.5">
        {LOADING_STEPS.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${
              i < stepIndex ? 'bg-indigo-500' :
              i === stepIndex ? 'animate-pulse bg-indigo-400' :
              'bg-slate-700'
            }`} />
            <p className={`text-xs transition-colors duration-300 ${i <= stepIndex ? 'text-slate-300' : 'text-slate-600'}`}>
              {step}
            </p>
            {i < stepIndex && (
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-auto text-xs text-indigo-500"
              >
                ✓
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Stage: Result ─────────────────────────────────────────────────────────────

function StageResult({
  result,
  inputText,
  onReset,
}: {
  result: AnalysisResult;
  inputText: string;
  onReset: () => void;
}) {
  const cfg = VERDICT_CONFIG[result.verdict];
  const VerdictIcon = cfg.icon;

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col items-center gap-2 border-b border-slate-800 pb-5 text-center">
        <VerdictIcon className={`h-8 w-8 ${cfg.bigColor}`} />
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 180 }}
          className={`text-6xl font-black tabular-nums ${cfg.bigColor}`}
        >
          {result.confidence}%
        </motion.p>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-wider ${cfg.badgeBg} ${cfg.badgeBorder} ${cfg.badgeText}`}>
          <VerdictIcon className="h-3 w-3" />
          {cfg.label}
        </span>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2.5">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">Input yang dianalisis</p>
        <p className="line-clamp-2 text-xs text-slate-400">&ldquo;{inputText}&rdquo;</p>
      </div>

      <div className={`rounded-r-xl border-l-4 bg-slate-900/60 p-4 ${cfg.borderLeft}`}>
        <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Alasan Penilaian
        </h3>
        <p className="text-sm leading-relaxed text-slate-300">{result.reasoning}</p>
      </div>

      <div>
        <h3 className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Sumber Rujukan Terpercaya
        </h3>
        <div className="space-y-2">
          {result.sources.map((src, i) => (
            <a
              key={i}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2.5 text-sm text-indigo-400 transition-colors hover:border-indigo-500/40 hover:text-indigo-300"
            >
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              {src.label}
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-transparent py-3 text-sm font-medium text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
      >
        <RotateCcw className="h-4 w-4" />
        Cek Berita Lain
      </button>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ChatbotPage() {
  const [stage, setStage] = useState<Stage>('input');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = useCallback((text: string) => {
    setInputText(text);
    setStage('loading');
    setTimeout(() => {
      setResult(getSmartMockResult(text));
      setStage('result');
    }, 2800);
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setInputText('');
    setStage('input');
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      
      {/* ─── CUSTOM FIXED HEADER ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary transition-colors hover:text-primary/80">
            <ShieldCheck className="h-6 w-6" />
            VeriFakta
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <UserCircle className="h-4 w-4" />
            Masuk / Daftar
          </Link>
        </div>
      </header>

      {/* Background glow (Fixed agar tidak ikut scroll) */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[500px] w-[500px] rounded-full bg-indigo-700/10 blur-3xl" />
      </div>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="relative flex flex-1 flex-col items-center justify-start px-4 pt-28 pb-12 w-full">
        
        <div className="z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-7 shadow-2xl backdrop-blur-sm my-auto">
          <AnimatePresence mode="wait">
            {stage === 'input' && <StageInput key="input" onSubmit={handleSubmit} />}
            {stage === 'loading' && <StageLoading key="loading" inputText={inputText} />}
            {stage === 'result' && result && (
              <StageResult key="result" result={result} inputText={inputText} onReset={handleReset} />
            )}
          </AnimatePresence>
        </div>

        {/* Footer Text */}
        <p className="relative z-10 mt-8 text-center text-xs text-slate-700">
          Hasil analisis bersifat informatif. Selalu verifikasi dengan sumber resmi.
        </p>
      </main>

    </div>
  );
}