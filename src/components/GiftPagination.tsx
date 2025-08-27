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
    <div className="w-full">
      {/* Main Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Send a Condolence Gift</h2>
        <p className="text-gray-600">Thank you.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
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
    </div>
  );
};

export default GiftPagination;
