'use client';

import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  content: string;
  role: 'user' | 'ai';
  verdict?: string;
  confidence?: number;
}

const verdictColors: Record<string, string> = {
  fakta: 'bg-green-500/10 text-green-400 border-green-500/30',
  hoaks: 'bg-red-500/10 text-red-400 border-red-500/30',
  opini: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  misleading: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
};

export default function MessageBubble({ content, role, verdict, confidence }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? 'bg-secondary/20' : 'bg-primary/20'
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-secondary" />
        ) : (
          <Bot className="h-4 w-4 text-primary" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'border border-border/40 bg-card text-foreground'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>

        {/* Verdict badge */}
        {verdict && (
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase ${
                verdictColors[verdict] || 'bg-primary/10 text-primary border-primary/30'
              }`}
            >
              {verdict}
            </span>
            {confidence && (
              <span className="text-xs text-muted-foreground">
                {confidence}% confidence
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
