'use client';

import FadeIn from '@/components/shared/FadeIn';
import { ShieldCheck, Sparkles, Globe } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Illustration */}
            <div className="relative flex items-center justify-center">
              <div className="relative h-72 w-72 sm:h-80 sm:w-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
                <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-border/40 bg-card/50 backdrop-blur">
                  <div className="flex flex-col items-center gap-4">
                    <ShieldCheck className="h-16 w-16 text-primary" />
                    <div className="flex gap-3">
                      <Sparkles className="h-8 w-8 text-secondary" />
                      <Globe className="h-8 w-8 text-primary/70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Tentang VeriFakta
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                VeriFakta adalah platform verifikasi berita berbasis AI yang dirancang
                untuk menjembatani celah antara informasi mentah dan fakta otentik.
              </p>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Dengan teknologi <strong className="text-foreground">Large Language Model (LLM)</strong> dan{' '}
                <strong className="text-foreground">Retrieval-Augmented Generation (RAG)</strong>,
                kami membantu jurnalis, mahasiswa, dan masyarakat umum memvalidasi
                berita secara mandiri dan interaktif.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
