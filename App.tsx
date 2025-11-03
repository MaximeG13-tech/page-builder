import React, { useState, useCallback } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CARD_CONFIGS, NOTE_TEMPLATES } from './constants';
import type { CardConfig, DroppedCard, AIGeneratedCard } from './types';
import { GoogleGenAI, Type } from "@google/genai";

import { Header } from './components/Header';
import { CardPalette } from './components/CardPalette';
import { Dropzone } from './components/Dropzone';
import { NotesPanel } from './components/NotesPanel';
import { ActionsPanel } from './components/ActionsPanel';
import { SelectionModal } from './components/SelectionModal';
import { AIStrategyModal } from './components/AIStrategyModal';
import { CardUI } from './components/CardUI';

interface ModalState {
  isOpen: boolean;
  cardConfig?: CardConfig;
  onConfirm?: (subtype: string, subLabel: string) => void;
}

export default function App() {
  const [droppedCards, setDroppedCards] = useState<DroppedCard[]>([]);
  const [notes, setNotes] = useState('');
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleGenerateStrategy = async (businessDescription: string, jsonContent: string | null) => {
    setIsGenerating(true);
    setAiError(null);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const availableSections = JSON.stringify(CARD_CONFIGS.map(c => ({
      type: c.type,
      label: c.label,
      isUnique: c.isUnique,
      options: c.options?.map(o => ({ value: o.value, label: o.label }))
    })), null, 2);
    
    let additionalContext = '';
    if (jsonContent) {
      additionalContext = `
      CONTEXTE ADDITIONNEL : Voici des données extraites du site web actuel. Utilise-les pour mieux comprendre le métier.
      Données JSON :
      ${jsonContent}
      `;
    }

    const prompt = `
      Vous êtes un architecte de l'information créant un brief technique pour un graphiste.
      Votre mission est de créer la structure d'une page d'accueil et les notes techniques associées.
      Les notes doivent être BRÈVES, TECHNIQUES, et CONCISES. NE PAS rédiger de contenu marketing, de slogans ou de descriptions. Le graphiste a seulement besoin de la structure.

      Voici un exemple du style EXACT attendu pour les notes :
      "STRATE 1 : Nos formations
      Encarts administrables
      Affichage x3

      STRATE 2 : Présentation
      Gauche : Titre + description
      Droite : Photo simple x1"

      DESCRIPTION DE L'ACTIVITÉ :
      "${businessDescription}"
      
      ${additionalContext}

      SECTIONS DISPONIBLES :
      ${availableSections}

      TEMPLATES DE NOTES (base de travail) :
      ${JSON.stringify(NOTE_TEMPLATES, null, 2)}

      Générez la structure en respectant IMPÉRATIVEMENT les règles suivantes :
      1.  Format : Un tableau JSON d'objets.
      2.  Propriétés de l'objet : "type", "label", "subtype", "noteContent".
      3.  "label": Un titre descriptif et COURT (ex: "Nos réalisations", "Présentation de l'équipe").
      4.  "subtype": Une valeur valide des 'options' de la section, ou null.
      5.  "noteContent": Le brief technique pour le graphiste. Doit être extrêmement concis.
          - Utilisez les templates comme base.
          - Adaptez-les au contexte (ex: changez "Encart x…" en "Encart x3" si pertinent).
          - Restez purement structurel (ex: "Gauche : Photo", "Droite : Titre + Texte").
      6.  Règle spéciale pour "reassurance": Le "noteContent" DOIT être "Éléments de réassurance avec les chiffres clés x4". NE PAS inventer de chiffres.
      7.  La section "annonces" doit être en DERNIÈRE position si utilisée.
      8.  Nombre total de sections : entre 7 et 9.
      9.  N'incluez PAS de section de type 'form'.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                label: { type: Type.STRING },
                subtype: { type: Type.STRING, nullable: true },
                noteContent: { type: Type.STRING },
              }
            }
          }
        }
      });
      
      const generatedStructure: AIGeneratedCard[] = JSON.parse(response.text);

      const newCards: DroppedCard[] = generatedStructure.map(item => ({
        id: `${item.type}-${Date.now()}-${Math.random()}`,
        type: item.type,
        label: item.label,
        subtype: item.subtype,
        noteContent: item.noteContent,
      }));

      setDroppedCards(newCards);
      setIsAIModalOpen(false);

    } catch (error) {
      console.error("Error generating strategy:", error);
      setAiError("Une erreur est survenue lors de la génération de la stratégie. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  const addCardToDropzone = (cardConfig: CardConfig, subtype?: string, subLabel?: string) => {
    let noteContent = '';
    const templateSubtype = subtype || null;
    if (NOTE_TEMPLATES[cardConfig.type]) {
        if (templateSubtype && typeof NOTE_TEMPLATES[cardConfig.type] === 'object') {
            noteContent = NOTE_TEMPLATES[cardConfig.type][templateSubtype] || '';
        } else if (typeof NOTE_TEMPLATES[cardConfig.type] === 'string') {
            noteContent = NOTE_TEMPLATES[cardConfig.type];
        }
    }
    if (!noteContent) {
        noteContent = `${subLabel || cardConfig.label}`;
    }

    const newCard: DroppedCard = {
      id: `${cardConfig.type}-${Date.now()}`,
      type: cardConfig.type,
      label: subLabel || cardConfig.label,
      subtype,
      noteContent: noteContent
    };
    setDroppedCards((cards) => [...cards, newCard]);
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id && active.data.current?.source === 'dropzone' && over.data.current?.source === 'dropzone') {
      setDroppedCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(items, oldIndex, newIndex);
        }
        return items;
      });
      return;
    }

    if (active.data.current?.source === 'palette' && (over.id === 'dropzone-area' || over.data.current?.source === 'dropzone')) {
      const cardConfig = active.data.current.config as CardConfig;
      
      const isAlreadyDropped = droppedCards.some(c => c.type === cardConfig.type);
      if (cardConfig.isUnique && isAlreadyDropped) return;

      if (cardConfig.options) {
        setModalState({
          isOpen: true,
          cardConfig,
          onConfirm: (subtype, subLabel) => {
            addCardToDropzone(cardConfig, subtype, subLabel);
            setModalState({ isOpen: false });
          },
        });
      } else {
        addCardToDropzone(cardConfig);
      }
    }
  };
  
  const handleModalCancel = () => {
    setModalState({ isOpen: false });
  };
  
  const handleRemoveCard = (id: string) => {
    setDroppedCards((cards) => cards.filter((card) => card.id !== id));
  };
  
  const handleEditCard = (id: string) => {
    const cardToEdit = droppedCards.find(c => c.id === id);
    if (!cardToEdit) return;
    
    const cardConfig = CARD_CONFIGS.find(c => c.type === cardToEdit.type);
    if (!cardConfig || !cardConfig.options) return;
    
    setModalState({
        isOpen: true,
        cardConfig,
        onConfirm: (subtype, subLabel) => {
            let newNoteContent = cardToEdit.noteContent; // Default to old content
            if (NOTE_TEMPLATES[cardConfig.type] && typeof NOTE_TEMPLATES[cardConfig.type] === 'object') {
                newNoteContent = NOTE_TEMPLATES[cardConfig.type][subtype] || subLabel;
            }

            setDroppedCards(cards => cards.map(c => 
                c.id === id ? { ...c, subtype, label: subLabel, noteContent: newNoteContent } : c
            ));
            setModalState({ isOpen: false });
        },
    });
  };

  const handleGenerateNotes = useCallback(() => {
    let strateCounter = 0;
    const generatedNotes = droppedCards
      .map((card) => {
        const noteContent = card.noteContent || '';

        // Diaporama is an intro, not a "STRATE"
        if (card.type === 'diaporama') {
          return noteContent.trim();
        }

        // All other sections are numbered sequentially
        strateCounter++;
        const noteTitle = `STRATE ${strateCounter} : ${card.label}`;
        return `${noteTitle}\n${noteContent.trim()}`;
      })
      .filter(Boolean)
      .join('\n\n');
    setNotes(generatedNotes);
  }, [droppedCards]);

  const handleReset = useCallback(() => {
    setDroppedCards([]);
    setNotes('');
    setIsAIModalOpen(true);
  }, []);

  const activeCard = activeId ? 
    droppedCards.find(c => c.id === activeId) || 
    CARD_CONFIGS.find(c => c.type === activeId) : null;
  
  const isCardDisabled = (cardConf: CardConfig) => {
      if (!cardConf.isUnique) return false;
      return droppedCards.some(dc => dc.type === cardConf.type);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <AIStrategyModal
        isOpen={isAIModalOpen}
        isGenerating={isGenerating}
        error={aiError}
        onGenerate={handleGenerateStrategy}
        onClose={() => setIsAIModalOpen(false)}
      />

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <Header />

        <CardPalette configs={CARD_CONFIGS} disabledChecker={isCardDisabled} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <SortableContext items={droppedCards.map(c => c.id)} strategy={verticalListSortingStrategy}>
            <Dropzone cards={droppedCards} onRemove={handleRemoveCard} onEdit={handleEditCard} />
          </SortableContext>
          <NotesPanel notes={notes} onNotesChange={setNotes} />
        </div>
        
        <ActionsPanel onGenerateNotes={handleGenerateNotes} onReset={handleReset} />
      </div>

      {modalState.isOpen && modalState.cardConfig && modalState.onConfirm && (
        <SelectionModal
          title={`Quel type de ${modalState.cardConfig.label} ?`}
          options={modalState.cardConfig.options || []}
          onConfirm={modalState.onConfirm}
          onCancel={handleModalCancel}
        />
      )}
      
       <DragOverlay>
        {activeId && activeCard ? (
          <CardUI 
            label={activeCard.label}
            type={'type' in activeCard ? activeCard.type : activeId as any} 
            isOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}