'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { type TeamMember } from '@/constants/team';

interface ContributorCardProps {
  data: TeamMember;
  index: number;
}

export default function ContributorCard({ data, index }: ContributorCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={() =>
        window.open(
          `https://github.com/${data.githubUsername}`,
          '_blank',
          'noopener,noreferrer'
        )
      }
      className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-900 p-6 cursor-pointer hover:border-blue-500/50 transition-colors"
    >
      {/* Avatar + Role Badge */}
      <div className="relative flex flex-col items-center mb-7">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://github.com/${data.githubUsername}.png?size=200`}
          alt={`@${data.githubUsername}`}
          className="rounded-full w-24 h-24 object-cover"
          suppressHydrationWarning
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.githubUsername)}&background=4f46e5&color=fff&size=200`;
          }}
        />
        <span className="absolute -bottom-3 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
          {data.badge}
        </span>
      </div>

      {/* Username + Role */}
      <div className="text-center mb-4">
        <span className="font-bold text-white text-sm">@{data.githubUsername}</span>
        <p className="text-indigo-400 text-sm font-medium mt-1">{data.roleTitle}</p>
      </div>

      {/* Lihat Peran toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowDetail((v) => !v);
        }}
        className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        Lihat Peran
        <ChevronDown
          className={`size-3.5 transition-transform duration-300 ${
            showDetail ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {showDetail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full overflow-hidden mt-3"
          >
            <ul className="w-full space-y-1.5 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              {data.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="mt-0.5 text-indigo-400">•</span>
                  {task}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
