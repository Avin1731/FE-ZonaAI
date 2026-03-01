'use client';

import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { getNextDummyResponse } from '@/data/chatResponses';
import { Send, Loader2, ShieldCheck } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'ai';
  verdict?: string;
  confidence?: number;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content:
        'Halo! Saya VeriFakta AI. Kirimkan teks berita atau klaim yang ingin Anda verifikasi, dan saya akan menganalisisnya untuk Anda.',
      role: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: text.trim(),
      role: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay (1-2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));

    const response = getNextDummyResponse();
    const aiMessage: Message = {
      id: `ai-${Date.now()}`,
      content: response.message,
      role: 'ai',
      verdict: response.verdict,
      confidence: response.confidence,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMessage]);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-border/40 bg-[#0d0e24] px-6 py-4">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <div>
          <h2 className="text-sm font-semibold text-foreground">VeriFakta AI</h2>
          <p className="text-xs text-muted-foreground">RAG-Powered Fact Checker</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            role={message.role}
            verdict={message.verdict}
            confidence={message.confidence}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
            <div className="rounded-2xl border border-border/40 bg-card px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border/40 bg-[#0d0e24] p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Masukkan teks berita untuk diverifikasi..."
            className="flex-1 rounded-xl border border-border/40 bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
