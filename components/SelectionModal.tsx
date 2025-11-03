
import React, { useState, useEffect } from 'react';
import type { CardOption } from '../types';

interface SelectionModalProps {
  title: string;
  options: CardOption[];
  onConfirm: (value: string, label: string) => void;
  onCancel: () => void;
}

export const SelectionModal: React.FC<SelectionModalProps> = ({ title, options, onConfirm, onCancel }) => {
  const [selectedValue, setSelectedValue] = useState(options[0]?.value || '');
  
  const handleConfirm = () => {
    const selectedOption = options.find(opt => opt.value === selectedValue);
    if (selectedOption) {
      onConfirm(selectedOption.value, selectedOption.label);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Enter') handleConfirm();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-4">
          <select 
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="flex gap-2 justify-end">
            <button
              onClick={onCancel}
              className="py-2 px-4 border border-gray-200 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              className="py-2 px-4 border border-transparent rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
