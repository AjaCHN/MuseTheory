// app/components/ChatBot.tsx v0.0.7 - Apple Style
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToTutorStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Bot, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';

const ChatBot: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    } else if (messages.length === 0) {
      setMessages([{ id: 'welcome', role: 'model', text: t.chat.welcome, timestamp: Date.now() }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    const botMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '', timestamp: Date.now() }]);

    try {
      const stream = sendMessageToTutorStream(userMsg.text);
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => prev.map(msg => msg.id === botMsgId ? { ...msg, text: fullText } : msg));
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.map(msg => msg.id === botMsgId ? { ...msg, text: "I apologize, but I encountered an error. Please try asking again." } : msg));
    } finally {
      setIsSending(false);
    }
  };

  const handleClear = () => {
    const defaultMsg: ChatMessage[] = [{ id: 'welcome', role: 'model', text: t.chat.welcome, timestamp: Date.now() }];
    setMessages(defaultMsg);
    localStorage.setItem('chatHistory', JSON.stringify(defaultMsg));
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
