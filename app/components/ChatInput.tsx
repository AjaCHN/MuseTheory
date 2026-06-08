// app/components/ChatInput.tsx v0.0.7 - Apple Style
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
    <form onSubmit={onSend} className="chat-input-area">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.chat.placeholder}
        className="chat-input"
      />
      <button
        type="submit"
        disabled={!input.trim() || isSending}
        className="chat-send-btn"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
