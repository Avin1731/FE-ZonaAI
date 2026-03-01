'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeIn from '@/components/shared/FadeIn';
import StepCard from '@/components/cara-pemakaian/StepCard';
import { steps } from '@/data/steps';
import { ArrowRight, Info } from 'lucide-react';

export default function CaraPemakaianPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24">
      <section className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          
          <FadeIn
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-indigo-400">
              <Info className="h-3 w-3" />
              PANDUAN
            </div>
            
            <h1 className="mb-4 text-4xl font-bold text-slate-50 sm:text-5xl">
              Cara Pemakaian
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
              Ikuti langkah-langkah berikut untuk memverifikasi berita menggunakan VeriFakta.
            </p>
          </FadeIn>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto max-w-3xl mt-16" // Membatasi max-w khusus list langkah biar rapi
          >
            {steps.map((step, index) => (
              <FadeIn key={step.number} delay={index * 0.1}>
                <StepCard step={step} isLast={index === steps.length - 1} />
              </FadeIn>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            className="mt-12 text-center"
          >
            <Link
              href="/chatbot"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Coba Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              ← Kembali ke Beranda
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}