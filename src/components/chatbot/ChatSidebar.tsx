'use client';

import { MessageSquare, Clock } from 'lucide-react';

interface ChatSidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const dummyHistory = [
  { id: '1', title: 'Verifikasi berita vaksin COVID', timestamp: '2 jam lalu' },
  { id: '2', title: 'Cek fakta pemilu 2024', timestamp: '5 jam lalu' },
  { id: '3', title: 'Analisis klaim perubahan iklim', timestamp: 'Kemarin' },
  { id: '4', title: 'Verifikasi data statistik BPS', timestamp: '2 hari lalu' },
  { id: '5', title: 'Cek hoaks viral media sosial', timestamp: '3 hari lalu' },
];

export default function ChatSidebar({ activeId, onSelect }: ChatSidebarProps) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border/40 bg-[#0d0e24]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border/40 p-4">
        <MessageSquare className="h-5 w-5 text-primary" />
        <span className="text-sm font-semibold text-foreground">Riwayat Chat</span>
      </div>

      {/* History list */}
      <div className="flex-1 overflow-y-auto p-2">
        {dummyHistory.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`mb-1 w-full rounded-lg px-3 py-2.5 text-left transition-colors ${
              activeId === item.id
                ? 'bg-primary/10 text-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <p className="truncate text-sm font-medium">{item.title}</p>
            <div className="mt-1 flex items-center gap-1 text-xs opacity-60">
              <Clock className="h-3 w-3" />
              {item.timestamp}
            </div>
          </button>
        ))}
      </div>

      {/* New chat button */}
      <div className="border-t border-border/40 p-3">
        <button
          onClick={() => onSelect('new')}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          + Chat Baru
        </button>
      </div>
    </aside>
  );
}
