import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const BurialDetailsModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div className="relative z-10 w-[92vw] max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-surface border border-border shadow-xl p-6 md:p-8">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-display text-text-primary">Burial Details</h3>
          <button
            onClick={onClose}
            className="ml-4 rounded-full px-3 py-1 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary"
            aria-label="Close burial details"
          >
            Close
          </button>
        </div>

        <div className="mt-4 space-y-6 text-sm leading-7">
          <section>
            <h4 className="font-semibold text-text-primary">11th September 2025 — Service of Songs</h4>
            <ul className="list-disc pl-5 text-text-secondary mt-2 space-y-1">
              <li>2:00pm at NKST Mabushi</li>
              <li>6:00pm at Family residence, Gwarinpa Estate, Abuja</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-text-primary">12th September 2025 — Wake</h4>
            <ul className="list-disc pl-5 text-text-secondary mt-2 space-y-1">
              <li>6:00pm at Family residence, Konshisha, Benue State</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-text-primary">13th September 2025 — Laying to Rest</h4>
            <ul className="list-disc pl-5 text-text-secondary mt-2 space-y-1">
              <li>9:00am at Family residence, Konshisha, Benue State</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-text-primary">14th September 2025 — Thanksgiving Service</h4>
            <ul className="list-disc pl-5 text-text-secondary mt-2 space-y-1">
              <li>9:00am at NKST Konshisha Church, Family residence, Konshisha, Benue State</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BurialDetailsModal;

