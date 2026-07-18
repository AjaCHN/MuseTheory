// app/components/ChatInput.tsx v0.0.9 - Minimal Editorial
'use client';

import React from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  isSending: boolean;
  onSend: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, isSending, onSend }) => {
  const { t } = useLanguage();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(e);
    }
  };

  return (
    <form onSubmit={onSend} className="w-full flex gap-2">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t.chat.placeholder}
        className="min-h-[48px] max-h-32 resize-none rounded-lg"
        disabled={isSending}
        rows={1}
      />
      <Button
        type="submit"
        disabled={!input.trim() || isSending}
        size="icon"
        className="h-12 w-12 rounded-lg shrink-0"
      >
        {isSending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Send className="w-5 h-5" strokeWidth={1.5} />
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
