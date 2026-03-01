'use client';

import Link from 'next/link';
import FadeIn from '@/components/shared/FadeIn';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b1a] via-[#0f1035] to-[#0a0b1a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.15)_0%,_transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeIn>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            🛡️ AI-Powered Fact Checker
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Verifikasi Berita dengan{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Kekuatan AI
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            VeriFakta menggunakan teknologi LLM &amp; RAG untuk membantu Anda
            membedakan fakta dan hoaks secara cepat, akurat, dan interaktif.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/chatbot"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              Mulai Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/cara-pemakaian"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <BookOpen className="h-4 w-4" />
              Cara Pemakaian
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
