// app/components/ChatMessageList.tsx v0.0.5
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
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'}
            `}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`
              p-3 rounded-2xl text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-sm' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-sm'}
            `}>
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
             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
               <Bot size={16} />
             </div>
             <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
               <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
               <span className="text-xs text-slate-500">{t.chat.thinking}</span>
             </div>
           </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
