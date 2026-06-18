// app/components/ChatBot.tsx v0.0.7 - Apple Style
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToTutorStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Bot, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';

const CHAT_STORAGE_KEY = 'chatHistory';
const MAX_STORED_MESSAGES = 200;
const MAX_TEXT_LENGTH = 200_000;

const isValidChatMessage = (value: unknown): value is ChatMessage => {
  if (!value || typeof value !== 'object') return false;
  const msg = value as Record<string, unknown>;
  return (
    typeof msg.id === 'string' &&
    msg.id.length > 0 &&
    (msg.role === 'user' || msg.role === 'model') &&
    typeof msg.text === 'string' &&
    typeof msg.timestamp === 'number' &&
    msg.text.length <= MAX_TEXT_LENGTH
  );
};

const validateMessages = (data: unknown): ChatMessage[] => {
  if (!Array.isArray(data)) return [];
  const filtered = data.filter((item): item is ChatMessage => isValidChatMessage(item));
  if (filtered.length > MAX_STORED_MESSAGES) {
    return filtered.slice(filtered.length - MAX_STORED_MESSAGES);
  }
  return filtered;
};

const safeReadStorage = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    if (!('localStorage' in window)) return null;
    return window.localStorage.getItem(key);
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ChatBot] Failed to read from localStorage:', e);
    }
    return null;
  }
};

const safeWriteStorage = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  try {
    if (!('localStorage' in window)) return;
    window.localStorage.setItem(key, value);
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ChatBot] Failed to write to localStorage:', e);
    }
  }
};

const safeRemoveStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    if (!('localStorage' in window)) return;
    window.localStorage.removeItem(key);
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ChatBot] Failed to remove from localStorage:', e);
    }
  }
};

const ChatBot: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialHydratedRef = useRef(false);

  // Hydrate from localStorage once.  SSR is handled by the empty initial state.
  useEffect(() => {
    if (initialHydratedRef.current) return;
    initialHydratedRef.current = true;

    const saved = safeReadStorage(CHAT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const valid = validateMessages(parsed);
        if (valid.length > 0) {
          setMessages(valid);
          return;
        }
        // invalid payload - discard to avoid repeated failures.
        safeRemoveStorage(CHAT_STORAGE_KEY);
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[ChatBot] Failed to parse chat history:', e);
        }
        safeRemoveStorage(CHAT_STORAGE_KEY);
      }
    }
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: t.chat.welcome,
        timestamp: Date.now(),
      },
    ]);
  }, [t.chat.welcome]);

  // Persist the latest messages; cap size to prevent runaway storage.
  useEffect(() => {
    if (messages.length === 0) {
      safeRemoveStorage(CHAT_STORAGE_KEY);
      return;
    }
    const toStore =
      messages.length > MAX_STORED_MESSAGES
        ? messages.slice(messages.length - MAX_STORED_MESSAGES)
        : messages;
    safeWriteStorage(CHAT_STORAGE_KEY, JSON.stringify(toStore));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMsg: ChatMessage = {
      id: `${Date.now().toString()}-${Math.random().toString(36).slice(2, 8)}`,
      role: 'user',
      text: trimmed,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    const botMsgId = `${(Date.now() + 1).toString()}-${Math.random().toString(36).slice(2, 8)}`;
    setMessages((prev) => [
      ...prev,
      { id: botMsgId, role: 'model', text: '', timestamp: Date.now() },
    ]);

    try {
      const stream = sendMessageToTutorStream(userMsg.text);
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk;
        if (fullText.length > MAX_TEXT_LENGTH) {
          fullText = fullText.slice(0, MAX_TEXT_LENGTH);
        }
        setMessages((prev) =>
          prev.map((msg) => (msg.id === botMsgId ? { ...msg, text: fullText } : msg))
        );
      }
      if (fullText.length === 0) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? {
                  ...msg,
                  text: 'Received an empty response.  Please try again.',
                }
              : msg
          )
        );
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[ChatBot] Failed to stream tutor response:', error);
      }
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId
            ? { ...msg, text: 'I apologize, but I encountered an error. Please try asking again.' }
            : msg
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleClear = () => {
    const defaultMsg: ChatMessage[] = [
      {
        id: 'welcome',
        role: 'model',
        text: t.chat.welcome,
        timestamp: Date.now(),
      },
    ];
    setMessages(defaultMsg);
    safeRemoveStorage(CHAT_STORAGE_KEY);
  };

  return (
    <div className="chat-container">
      {/* Header - Apple Style */}
      <div className="chat-header">
        <h2 className="chat-title">
          <div className="p-2 bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 rounded-xl">
            <Bot className="w-5 h-5 text-white dark:text-slate-900" />
          </div>
          {t.chat.title}
        </h2>
        <button
          onClick={handleClear}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 flex items-center gap-2 text-sm"
          title={t.chat.clear}
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">{t.chat.clear}</span>
        </button>
      </div>

      {/* Messages - Apple Style */}
      <ChatMessageList messages={messages} isSending={isSending} messagesEndRef={messagesEndRef} />

      {/* Input - Apple Style */}
      <ChatInput input={input} setInput={setInput} isSending={isSending} onSend={handleSend} />
    </div>
  );
};

export default ChatBot;
