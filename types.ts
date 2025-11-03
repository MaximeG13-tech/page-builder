export type CardType = 
  | 'diaporama' | 'avis' | 'encarts' | 'reassurance' | 'texte' 
  | 'video' | 'flash' | 'annonces' | 'logos' | 'form' | 'team' | 'instagram';

export interface CardOption {
  value: string;
  label: string;
}

export interface CardConfig {
  type: CardType;
  label: string;
  isUnique: boolean;
  options?: CardOption[];
}

export interface DroppedCard {
  id: string;
  type: CardType;
  label: string;
  subtype?: string | null;
  noteContent: string;
}

export interface AIGeneratedCard {
  type: CardType;
  label: string;
  subtype: string | null;
  noteContent: string;
}