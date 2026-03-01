'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ArrowLeft, Wrench } from 'lucide-react';

export default function LoginPage() {
  return (
    // Background dan container utama tetap full screen
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-4">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[350px] w-[350px] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      {/* Logo di pojok kiri atas */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-6"
      >
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
          <ShieldCheck className="h-5 w-5" />
          VeriFakta
        </Link>
      </motion.div>

      {/* Main card - Dikecilin ukurannya jadi max-w-sm dan padding p-8 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur"
      >
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10">
          <Lock className="h-6 w-6 text-indigo-400" />
        </div>

        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-amber-400">
          <Wrench className="h-3 w-3" />
          Dalam Pembangunan
        </div>

        <h1 className="mb-2 text-2xl font-bold text-slate-50">
          Segera Hadir
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-slate-400">
          Fitur <span className="font-semibold text-slate-200">Akun Pengguna</span> sedang dalam tahap pengembangan aktif untuk keamanan optimal.
        </p>

        {/* Progress bar */}
        <div className="mb-6 text-left">
          <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
            <span>Progress Sistem</span>
            <span className="text-indigo-400">38%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '38%' }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            />
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative z-10 mt-8 text-xs font-medium text-slate-600"
      >
        © 2026 VeriFakta.
      </motion.p>
    </div>
  );
}