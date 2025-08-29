import React, { useState } from 'react';
import CondolenceGifts from './CondolenceGifts';
import InternationalGifts from './InternationalGifts';

const GiftPagination: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'international'>('local');

  const tabs = [
    {
      id: 'local' as const,
      label: 'Naira',
      description: ''
    },
    {
      id: 'international' as const,
      label: 'Other',
      description: ''
    }
  ];

  return (
    <section className="w-full" aria-label="Condolence gifts">
      {/* Main Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-text-primary mb-2">Send a Condolence Gift</h2>
        <p className="text-text-secondary">Thank you for your kindness and support.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="bg-secondary rounded-lg p-1 inline-flex border border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-surface text-text-primary shadow-sm border border-border'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Description */}
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </div>

      {/* Tab Content */}
      <div className="transition-opacity duration-300">
        {activeTab === 'local' ? (
          <CondolenceGifts />
        ) : (
          <InternationalGifts />
        )}
      </div>
    </section>
  );
};

export default GiftPagination;
