import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  display?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, display = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return `<span class="katex-error text-rose-400 font-mono text-xs">${math}</span>`;
    }
  }, [math, display]);

  if (display) {
    return (
      <div
        className={`katex-display-wrapper overflow-x-auto my-2 py-1 px-2 select-text ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`katex-inline-wrapper inline-block align-middle select-text ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const InlineMath: React.FC<{ math: string; className?: string }> = ({ math, className }) => (
  <MathView math={math} display={false} className={className} />
);

export const BlockMath: React.FC<{ math: string; className?: string }> = ({ math, className }) => (
  <MathView math={math} display={true} className={className} />
);

/**
 * Parses mixed text containing LaTeX delimiters:
 * - Block: $$...$$ or \[...\]
 * - Inline: $...$ or \(...\)
 */
export const FormattedMathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const renderedContent = useMemo(() => {
    if (!text) return null;

    // Regex to split text by delimiters: $$...$$, \[...\], \(...\), or $...$
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$[^$\n]+?\$)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (!part) return null;

      if (part.startsWith('$$') && part.endsWith('$$')) {
        const formula = part.slice(2, -2).trim();
        return <BlockMath key={index} math={formula} />;
      }
      if (part.startsWith('\\[') && part.endsWith('\\]')) {
        const formula = part.slice(2, -2).trim();
        return <BlockMath key={index} math={formula} />;
      }
      if (part.startsWith('\\(') && part.endsWith('\\)')) {
        const formula = part.slice(2, -2).trim();
        return <InlineMath key={index} math={formula} />;
      }
      if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
        const formula = part.slice(1, -1).trim();
        return <InlineMath key={index} math={formula} />;
      }

      return <span key={index}>{part}</span>;
    });
  }, [text]);

  return <span className={className}>{renderedContent}</span>;
};
