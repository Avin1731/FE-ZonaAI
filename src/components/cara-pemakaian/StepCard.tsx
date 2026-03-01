'use client';

import FadeIn from '@/components/shared/FadeIn';
import { type Step } from '@/data/steps';

interface StepCardProps {
  step: Step;
  isLast: boolean;
}

export default function StepCard({ step, isLast }: StepCardProps) {
  return (
    <div className="relative flex gap-6">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-14 h-[calc(100%-3.5rem)] w-px bg-gradient-to-b from-primary/50 to-transparent" />
      )}

      {/* Number badge */}
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
        <step.icon className="h-5 w-5 text-primary" />
      </div>

      {/* Content */}
      <div className="pb-12">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {step.number}
          </span>
          <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
        </div>
        <p className="mt-2 text-muted-foreground leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}
