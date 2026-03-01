'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ContributorCard from '@/components/contributor/ContributorCard';
import { TEAM_DATA } from '@/constants/team';
import FadeIn from '@/components/shared/FadeIn';

export default function ContributorPage() {
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
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400">
              TIM PENGEMBANG
            </div>
            <h1 className="mb-4 text-4xl font-bold text-slate-50 sm:text-5xl">
              Tim Kontributor
            </h1>
            <p className="mx-auto max-w-xl text-slate-400">
              Mengenal lebih dekat tim yang berdedikasi di balik platform ini — membangun solusi digital yang inovatif dan bermanfaat bagi masyarakat.
            </p>
          </FadeIn>

          {/* Contributor grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            {TEAM_DATA.map((member, i) => (
              <ContributorCard key={member.id} data={member} index={i} />
            ))}
          </motion.div>

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}