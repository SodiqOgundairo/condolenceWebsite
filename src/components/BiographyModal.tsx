import React from 'react';

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
        <div className="mt-4 space-y-4 text-sm leading-7 text-text-secondary">
          <p><strong className="text-text-primary">Arc (Dr) Terver Gemade</strong> (1957 – 2025) was a distinguished architect, administrator, and devoted Christian whose career spanned over three decades across both private and public service.</p>

          <p><strong className="text-text-primary">Early Life & Education:</strong> He began school at Demonstration School, Mkar (1963) and completed his WASC at Boys Secondary School, Gindiri (1977). He earned a B.Sc. (Architecture, Second Class Upper) and an M.Sc. (Distinction) from Ahmadu Bello University, Zaria, later receiving an Honorary Doctorate and completing a PhD in Environmental Resource Management.</p>

          <p><strong className="text-text-primary">Professional Journey:</strong> From 1983–1999 he worked in private practice, rising to Managing Director. From 1999–2014, he served the Federal Housing Authority, culminating as Managing Director/Chief Executive. Under his leadership, FHA delivered transformative housing projects including the Gwarinpa Housing Estate (Abuja), the largest in Sub‑Saharan Africa, as well as major developments in Guzape, Lugbe, Kado and initiatives across Lagos, Port‑Harcourt, Owerri, Calabar, Kaduna, Gombe and Kano. He also established an extensive national land bank to support future projects.</p>

          <p><strong className="text-text-primary">Professional Recognition:</strong> He was a fellow/member of several bodies including ARCON, NIA (FNIA), NIM (FNIM), NIMN (FNIMN), FABS, IFMA, CIH (UK), FEBI, FCIM and FMP, and received numerous awards for leadership, innovation and service to humanity.</p>

          <p><strong className="text-text-primary">Personal Life:</strong> A devoted family man, he was blessed with children and enjoyed music, travel and games. His faith, integrity and service continue to inspire those whose lives he touched.</p>
        </div>
      </div>
    </div>
  );
}

export default BiographyModal;

