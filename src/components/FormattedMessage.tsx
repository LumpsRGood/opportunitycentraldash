import React from 'react';

/**
 * Clean Rich Message Formatter for Syrup's answers.
 * Replaces ugly markdown raw stars (***, **, *) and hashtags (###, ##, #)
 * with elegant typography, clear section headings, neat bullet lists, 
 * styled contact/email pills, and readable spacing.
 */
interface FormattedMessageProps {
  content: string;
}

export function FormattedMessage({ content }: FormattedMessageProps) {
  // Split into paragraphs / lines
  const lines = content.split('\n');

  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-2.5 space-y-1.5 pl-4 list-disc marker:text-amber-600 text-slate-700">
          {currentList.map((item, idx) => (
            <li key={idx} className="leading-relaxed pl-0.5">
              {renderInlineStyles(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((rawLine, lineIndex) => {
    const line = rawLine.trim();

    // Empty line creates subtle breathing room
    if (!line) {
      flushList();
      return;
    }

    // Check for Markdown headers: #, ##, ###, ####
    const headerMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headerMatch) {
      flushList();
      const level = headerMatch[1].length;
      const text = headerMatch[2];
      
      if (level <= 2) {
        elements.push(
          <div key={`h-${lineIndex}`} className="mt-3.5 mb-1.5 font-bold text-slate-900 text-[13.5px] border-b border-amber-200/60 pb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span>{renderInlineStyles(text)}</span>
          </div>
        );
      } else {
        elements.push(
          <div key={`h-${lineIndex}`} className="mt-2.5 mb-1 font-semibold text-slate-800 text-[12.5px] text-amber-900">
            {renderInlineStyles(text)}
          </div>
        );
      }
      return;
    }

    // Check for bullet list items: •, -, *, 1., 2.
    const bulletMatch = line.match(/^([•\-\*]|\d+[\.\)])\s+(.+)$/);
    if (bulletMatch) {
      currentList.push(bulletMatch[2]);
      return;
    }

    // Check for stand-alone highlighted callouts (e.g., Note:, Important:)
    flushList();

    elements.push(
      <p key={`p-${lineIndex}`} className="my-1.5 leading-relaxed text-slate-700">
        {renderInlineStyles(line)}
      </p>
    );
  });

  flushList();

  return <div className="text-[12.5px] leading-relaxed select-text space-y-0.5">{elements}</div>;
}

/**
 * Format inline elements like **bold**, *italics*, `code/emails`, and clean raw markdown artifacts
 */
function renderInlineStyles(text: string): React.ReactNode {
  // Clean stray hashtags at start of text if any
  let cleanText = text.replace(/^#+\s*/, '');

  // Split tokens by email addresses, bold patterns (**text**), and inline code (`code`)
  const parts: React.ReactNode[] = [];

  // Match bold: **bold** or __bold__
  // Match code / email pill: `code` or raw emails
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|[\w.\-]+@[\w.\-]+\.[a-zA-Z]{2,})/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(cleanText)) !== null) {
    const matchStart = match.index;
    const matchEnd = regex.lastIndex;

    // Normal text before match
    if (matchStart > lastIndex) {
      parts.push(cleanText.substring(lastIndex, matchStart));
    }

    const token = match[0];

    if (token.startsWith('**') && token.endsWith('**')) {
      const boldInner = token.slice(2, -2);
      parts.push(
        <strong key={`b-${matchStart}`} className="font-bold text-slate-900">
          {boldInner}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      const codeInner = token.slice(1, -1);
      const isEmail = codeInner.includes('@');
      parts.push(
        <span 
          key={`c-${matchStart}`} 
          className={`inline-block px-1.5 py-0.2 rounded font-mono text-[11.5px] ${
            isEmail 
              ? 'bg-amber-100 text-amber-950 border border-amber-300/80 font-semibold' 
              : 'bg-slate-100 text-slate-800 border border-slate-200'
          }`}
        >
          {codeInner}
        </span>
      );
    } else if (token.includes('@')) {
      // Auto-styled email pill
      parts.push(
        <a
          key={`e-${matchStart}`}
          href={`mailto:${token}`}
          className="inline-block px-1.5 py-0.2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 rounded font-semibold text-[11.5px] transition-colors"
        >
          {token}
        </a>
      );
    }

    lastIndex = matchEnd;
  }

  // Trailing text
  if (lastIndex < cleanText.length) {
    parts.push(cleanText.substring(lastIndex));
  }

  return parts;
}
