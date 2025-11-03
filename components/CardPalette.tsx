
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CardConfig } from '../types';
import { CardUI } from './CardUI';

interface DraggableCardProps {
  config: CardConfig;
  isDisabled: boolean;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ config, isDisabled }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: config.type,
    data: {
      source: 'palette',
      config,
    },
    disabled: isDisabled,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
       <CardUI type={config.type} label={config.label} isDisabled={isDisabled} />
    </div>
  );
};

interface CardPaletteProps {
  configs: CardConfig[];
  disabledChecker: (config: CardConfig) => boolean;
}

export const CardPalette: React.FC<CardPaletteProps> = ({ configs, disabledChecker }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
      {configs.map((config) => (
        <DraggableCard key={config.type} config={config} isDisabled={disabledChecker(config)} />
      ))}
    </div>
  );
};
