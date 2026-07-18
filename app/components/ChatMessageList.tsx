// app/components/ChatMessageList.tsx v0.0.9 - Minimal Editorial
'use client';

import React, { useMemo } from 'react';
import { User, Bot, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isSending: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const MAX_MESSAGE_LENGTH = 200_000;

const sanitizeText = (input: string): string => {
  if (typeof input !== 'string') return '';
  let safe = input;
  if (safe.length > MAX_MESSAGE_LENGTH) {
    safe = safe.slice(0, MAX_MESSAGE_LENGTH);
  }
  safe = safe.replace(/\bon[a-z]+\s*=\s*"[^"]*"/gi, '');
  safe = safe.replace(/\bon[a-z]+\s*=\s*'[^']*'/gi, '');
  safe = safe.replace(/\bon[a-z]+\s*=\s*[^\s>]+/gi, '');
  safe = safe.replace(/\b(href|src)\s*=\s*["']javascript:[^"']*["']/gi, '$1="#"');
  safe = safe.replace(/\b(href|src)\s*=\s*["']vbscript:[^"']*["']/gi, '$1="#"');
  safe = safe.replace(/<script[\s>][\s\S]*?<\/script>/gi, '');
  safe = safe.replace(/<\/?script[^>]*>/gi, '');
  safe = safe.replace(/<iframe[\s>][\s\S]*?<\/iframe>/gi, '');
  safe = safe.replace(/<object[\s>][\s\S]*?<\/object>/gi, '');
  safe = safe.replace(/<embed[^>]*>/gi, '');
  safe = safe.replace(/<form[\s>][\s\S]*?<\/form>/gi, '');
  return safe;
};

const DISALLOWED_ELEMENTS = new Set([
  'script',
  'style',
  'iframe',
  'object',
  'embed',
  'form',
  'input',
  'textarea',
  'select',
  'button',
  'meta',
  'link',
]);

const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isSending,
  messagesEndRef,
}) => {
  const { t } = useLanguage();

  const safeMessages = useMemo(
    () =>
      messages.map((msg) => ({
        ...msg,
        text: msg.role === 'user' ? msg.text : sanitizeText(msg.text),
      })),
    [messages]
  );

  return (
    <ScrollArea className="h-full px-4 sm:px-6">
      <div className="py-4 space-y-4">
        {safeMessages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}
            style={{ animationDelay: `${index * 0.02}s` }}
          >
            <div
              className={`flex max-w-[85%] sm:max-w-[75%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs">
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg px-4 py-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <Markdown
                      disallowedElements={Array.from(DISALLOWED_ELEMENTS)}
                      unwrapDisallowed
                      allowElement={(element) =>
                        typeof element.tagName === 'string'
                          ? !DISALLOWED_ELEMENTS.has(element.tagName.toLowerCase())
                          : true
                      }
                    >
                      {msg.text}
                    </Markdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isSending && (
          <div className="flex w-full justify-start animate-fade-in">
            <div className="flex max-w-[85%] sm:max-w-[75%] gap-3 flex-row">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-4 py-3 text-sm bg-muted text-foreground flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">{t.chat.thinking}</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessageList;
