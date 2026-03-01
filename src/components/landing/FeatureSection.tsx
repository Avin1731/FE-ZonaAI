'use client';

import FadeIn from '@/components/shared/FadeIn';
import { features } from '@/data/features';

export default function FeatureSection() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <h1 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Fitur Unggulan
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Solusi lengkap untuk verifikasi berita dengan teknologi AI terdepan.
          </p>
        </FadeIn>

        <div className="mt-16 space-y-16">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.1}>
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                {/* Icon / Illustration (left) */}
                <div className={`flex items-center justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-border/40 bg-card/50 sm:h-48 sm:w-48">
                    <feature.icon className="h-16 w-16 text-primary" />
                  </div>
                </div>

                {/* Text (right) */}
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
