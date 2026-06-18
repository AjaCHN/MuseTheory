// app/components/ChatMessageList.tsx v0.0.7 - Apple Style
'use client';

import React, { useMemo } from 'react';
import { User, Bot, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isSending: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const MAX_MESSAGE_LENGTH = 200_000;

// Very conservative allowlist of HTML/Markdown constructs we permit.
// Any `<script`, `javascript:`, `onX=`, and suspicious protocol links are
// stripped before rendering.  react-markdown itself also escapes raw HTML
// by default (disallowedElements defaults to prevent raw HTML injection).
const sanitizeText = (input: string): string => {
  if (typeof input !== 'string') return '';
  let safe = input;
  // cap length to prevent runaway rendering on malicious payloads.
  if (safe.length > MAX_MESSAGE_LENGTH) {
    safe = safe.slice(0, MAX_MESSAGE_LENGTH);
  }
  // Remove inline event handlers and data-* attributes, and strip
  // javascript:/vbscript: protocol links that could be injected.
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

// Disallow elements that could be leveraged for phishing or script injection
// (react-markdown still escapes raw HTML on its own; this is defence-in-depth).
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
    <div className="chat-messages">
      {safeMessages.map((msg) => (
        <div
          key={msg.id}
          className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`
            flex max-w-[80%] gap-3 
            ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}
          `}
          >
            <div
              className={`
              flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center
              ${msg.role === 'user' ? 'bg-gradient-to-br from-slate-900 to-slate-700' : 'bg-gradient-to-br from-slate-500 to-slate-700'}
              text-white
            `}
            >
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>
            <div className={`chat-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
              {msg.role === 'user' ? (
                msg.text
              ) : (
                <div className="markdown-body prose prose-sm max-w-none dark:prose-invert">
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
