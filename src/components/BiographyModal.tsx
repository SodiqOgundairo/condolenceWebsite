import React from 'react';
import BiographyText from '../assets/biography.txt?raw';

const renderBiography = (text: string) => {
  const headers = new Set([
    'Early Life and Education',
    'Professional Career',
    'Academic and Professional Achievements',
    'Personal Life',
  ]);

  const lines = text.split(/\r?\n/);
  const out: React.ReactNode[] = [];
  let i = 0;

  // Optional: make the very first line (title) stand out if present
  if (lines.length && /^Biography of/i.test(lines[0])) {
    out.push(
      <h4 key="title" className="text-lg font-semibold text-text-primary">
        {lines[0]}
      </h4>
    );
    i = 1;
  }

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) { i++; continue; }

    // Sub headers
    if (headers.has(line)) {
      out.push(
        <p key={`h-${i}`} className="mt-6 font-semibold text-text-primary">
          {line}
        </p>
      );
      i++; continue;
    }

    // Bulleted lists
    if (line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('* ')) {
        items.push(lines[i].trim().replace(/^\*+\s*/, ''));
        i++;
      }
      out.push(
        <ul key={`ul-${i}`} className="list-disc pl-5 text-text-secondary space-y-1">
          {items.map((it, idx) => (
            <li key={idx}>{it}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Regular paragraph
    out.push(
      <p key={`p-${i}`} className="text-text-secondary">
        {raw}
      </p>
    );
    i++;
  }

  return out;
};

interface BiographyModalProps {
  open: boolean;
  onClose: () => void;
}

const BiographyModal: React.FC<BiographyModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-[92vw] max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl bg-surface border border-border shadow-xl p-6 md:p-8">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-display text-text-primary">Biography</h3>
          <button
            onClick={onClose}
            className="ml-4 rounded-full px-3 py-1 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary"
            aria-label="Close biography"
          >
            Close
          </button>
        </div>
        <div className="mt-4 text-sm leading-7">
          {renderBiography(BiographyText)}
        </div>
      </div>
    </div>
  );
}

export default BiographyModal;
