// app/components/ChatInput.tsx v0.0.7 - Apple Style
'use client';

import React from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  isSending: boolean;
  onSend: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, isSending, onSend }) => {
  const { t } = useLanguage();

  return (
    <form onSubmit={onSend} className="chat-input-area">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.chat.placeholder}
        className="chat-input border-2 focus:border-primary"
        disabled={isSending}
      />
      <Button
        type="submit"
        disabled={!input.trim() || isSending}
        size="icon"
        className="chat-send-btn rounded-full"
      >
        <Send size={20} />
      </Button>
    </form>
  );
};

export default ChatInput;
