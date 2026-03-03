// app/components/ChatInput.tsx v0.0.5
'use client';

import React from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  isSending: boolean;
  onSend: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, isSending, onSend }) => {
  const { t } = useLanguage();

  return (
    <form onSubmit={onSend} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.chat.placeholder}
        className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      />
      <button
        type="submit"
        disabled={!input.trim() || isSending}
        className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
