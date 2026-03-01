'use client';

import Link from 'next/link';
import FadeIn from '@/components/shared/FadeIn';
import { ArrowRight } from 'lucide-react';

export default function ClosingCta() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.1)_0%,_transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Siap Membedakan Fakta dari Hoaks?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Mulai gunakan VeriFakta sekarang dan rasakan kemudahan verifikasi
                berita berbasis AI yang cepat dan akurat.
              </p>
              <Link
                href="/chatbot"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
              >
                Coba VeriFakta
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
