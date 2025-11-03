import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DroppedCard } from '../types';
import { CardUI } from './CardUI';

interface SortableCardProps {
  card: DroppedCard;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

const SortableCard: React.FC<SortableCardProps> = ({ card, onRemove, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: card.id,
    data: {
        source: 'dropzone',
        type: 'dropped-card',
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
        <CardUI 
            type={card.type} 
            label={card.label} 
            isDropped
            dragListeners={listeners}
        >
             <button
                onClick={(e) => { e.stopPropagation(); onEdit(card.id); }}
                className="absolute top-1/2 -translate-y-1/2 right-12 w-8 h-8 p-0 border-none bg-gray-100 text-gray-500 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-blue-100 hover:text-blue-600 hover:scale-110 shadow-sm"
                aria-label="Éditer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onRemove(card.id); }}
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 p-0 border-none bg-gray-100 text-gray-500 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 hover:scale-110 shadow-sm"
                aria-label="Supprimer"
            >
                &times;
            </button>
        </CardUI>
    </div>
  );
};


interface DropzoneProps {
  cards: DroppedCard[];
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ cards, onRemove, onEdit }) => {
  const { setNodeRef } = useDroppable({
    id: 'dropzone-area',
    data: {
        type: 'dropzone-area'
    }
  });

  return (
    <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[300px] flex flex-col relative" ref={setNodeRef}>
      {cards.length === 0 ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-400 pointer-events-none">
          <div className="w-8 h-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="text-sm text-center">
            Déposez vos sections ici pour composer votre page d'accueil
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {cards.map((card) => (
            <SortableCard key={card.id} card={card} onRemove={onRemove} onEdit={onEdit} />
          ))}
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
        Nombre de strates : <span className="font-semibold text-gray-900">{cards.length}</span>
      </div>
    </div>
  );
};