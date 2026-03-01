'use client';

import dynamic from 'next/dynamic';
import FadeIn from '@/components/shared/FadeIn';
import { accuracyData, categoryDistribution, overallAccuracy, totalAnalyzed } from '@/data/statistics';

const BarChart = dynamic(() => import('recharts').then((mod) => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then((mod) => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then((mod) => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then((mod) => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((mod) => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then((mod) => mod.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import('recharts').then((mod) => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then((mod) => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then((mod) => mod.Cell), { ssr: false });
const Legend = dynamic(() => import('recharts').then((mod) => mod.Legend), { ssr: false });

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#818cf8'];

interface PieLabelProps {
  name: string;
  percent: number;
  x: number;
  y: number;
  textAnchor: "start" | "middle" | "end" | "inherit";
}

export default function StatsSection() {
  const formattedTotal = totalAnalyzed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Statistik Performa AI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Transparansi data akurasi dan distribusi kategori konten yang telah dianalisis.
          </p>
        </FadeIn>

        {/* Summary Cards */}
        <FadeIn delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border/40 bg-card p-6 text-center">
              <p className="text-4xl font-bold text-primary">{overallAccuracy}%</p>
              <p className="mt-2 text-sm text-muted-foreground">Akurasi Rata-rata</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-card p-6 text-center">
              <p className="text-4xl font-bold text-secondary">{formattedTotal}</p>
              <p className="mt-2 text-sm text-muted-foreground">Total Artikel Dianalisis</p>
            </div>
          </div>
        </FadeIn>

        {/* Charts */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* Bar Chart */}
          <FadeIn delay={0.2}>
            <div className="rounded-xl border border-border/40 bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Akurasi per Kategori</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#475569" 
                      tick={{ fill: '#cbd5e1' }} 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#475569" 
                      tick={{ fill: '#cbd5e1' }} 
                      fontSize={12} 
                      domain={[0, 100]} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(99,102,241,0.05)' }}
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #1e293b',
                        borderRadius: '8px',
                        color: '#f8fafc',
                      }}
                      itemStyle={{ color: '#e2e8f0' }}
                      labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                    />
                    <Bar dataKey="akurasi" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </FadeIn>

          {/* Pie Chart */}
          <FadeIn delay={0.3}>
            <div className="rounded-xl border border-border/40 bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Distribusi Kategori</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      labelLine={{ stroke: '#475569' }}
                      // Panggil interface yang udah kita benerin tipenya
                      label={(props: unknown) => {
                        const { name, percent, x, y, textAnchor } = props as PieLabelProps;
                        return (
                          <text 
                            x={x} 
                            y={y} 
                            fill="#cbd5e1" 
                            textAnchor={textAnchor} 
                            dominantBaseline="central" 
                            fontSize={12}
                          >
                            {`${name} ${Math.round(percent * 100)}%`}
                          </text>
                        );
                      }}
                    >
                      {categoryDistribution.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #1e293b',
                        borderRadius: '8px',
                      }}
                      itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend
                      wrapperStyle={{ color: '#cbd5e1', fontSize: '12px', paddingTop: '10px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}