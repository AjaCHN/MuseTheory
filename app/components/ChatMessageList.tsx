// app/components/ChatMessageList.tsx v0.0.7 - Apple Style
'use client';

import React from 'react';
import { User, Bot, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isSending: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, isSending, messagesEndRef }) => {
  const { t } = useLanguage();

  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`
            flex max-w-[80%] gap-3 
            ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}
          `}>
            <div className={`
              flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center
              ${msg.role === 'user' ? 'bg-gradient-to-br from-slate-900 to-slate-700' : 'bg-gradient-to-br from-slate-500 to-slate-700'}
              text-white
            `}>
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>
            <div className={`chat-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
              {msg.role === 'user' ? (
                msg.text
              ) : (
                <div className="markdown-body prose prose-sm max-w-none dark:prose-invert">
                  <Markdown>{msg.text}</Markdown>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {isSending && (
        <div className="flex justify-start">
           <div className="flex max-w-[80%] gap-3 flex-row">
             <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 text-white flex items-center justify-center">
               <Bot size={18} />
             </div>
             <div className="chat-bubble ai flex items-center gap-2">
               <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
               <span className="text-sm text-slate-500">{t.chat.thinking}</span>
             </div>
           </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
