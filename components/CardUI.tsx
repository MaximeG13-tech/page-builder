import React from 'react';
import { ICONS } from '../constants';
import { CardType } from '../types';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';

interface CardUIProps {
  label: string;
  type: CardType;
  isDisabled?: boolean;
  isOverlay?: boolean;
  isDropped?: boolean;
  children?: React.ReactNode;
  dragListeners?: DraggableSyntheticListeners;
}

export const CardUI: React.FC<CardUIProps> = ({ label, type, isDisabled, isOverlay, isDropped, children, dragListeners }) => {
  const icon = ICONS[type];
  const baseClasses = "relative group flex items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg transition-all duration-200";
  
  let stateClasses = '';
  if (isDisabled) {
    stateClasses = 'opacity-50 cursor-not-allowed';
  } else if (isOverlay) {
    stateClasses = 'shadow-lg scale-105';
  } else if (isDropped) {
    stateClasses = 'hover:border-gray-300 hover:bg-gray-50';
  } else {
    stateClasses = 'hover:border-gray-300 hover:bg-gray-50 cursor-grab';
  }
    
  return (
    <div className={`${baseClasses} ${stateClasses}`}>
      {isDropped && dragListeners && (
        <div {...dragListeners} className="cursor-grab touch-none p-1 -ml-2 text-gray-400 hover:text-gray-800 transition-colors" aria-label="Déplacer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="12" r="1"></circle>
            <circle cx="9" cy="5" r="1"></circle>
            <circle cx="9" cy="19" r="1"></circle>
            <circle cx="15" cy="12" r="1"></circle>
            <circle cx="15" cy="5" r="1"></circle>
            <circle cx="15" cy="19" r="1"></circle>
          </svg>
        </div>
      )}
      <div className={`w-6 h-6 shrink-0 ${isDropped ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`}>
        {icon}
      </div>
      <div className="flex-grow text-sm font-medium text-gray-700 truncate pr-20">{label}</div>
      {isDropped && children}
    </div>
  );
};