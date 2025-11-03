import React from 'react';
import { CardConfig, CardType } from './types';

export const ICONS: Record<CardType, JSX.Element> = {
  diaporama: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  avis: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  encarts: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  reassurance: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  texte: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>,
  video: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"/><rect x="3" y="6" width="12" height="12" rx="2" ry="2"/></svg>,
  flash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  annonces: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/></svg>,
  logos: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  // FIX: Add missing 'form' icon to satisfy the CardType definition.
  form: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/></svg>,
  team: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
};

export const CARD_CONFIGS: CardConfig[] = [
  { type: 'diaporama', label: 'Diaporama', isUnique: true, options: [
    { value: 'slogan', label: 'Diaporama slogan' },
    { value: 'legende', label: 'Diaporama légende' },
    { value: 'contact', label: 'Diaporama formulaire de contact' },
  ]},
  { type: 'avis', label: 'Avis clients', isUnique: true },
  { type: 'encarts', label: 'Encarts', isUnique: false, options: [
    { value: 'mosaic', label: 'Encart survol mosaïque' },
    { value: 'exterior', label: 'Encart extérieur' },
    { value: 'slide', label: 'Encart slide' },
    { value: 'slide-half', label: 'Encart slide 50/50' },
  ]},
  { type: 'reassurance', label: 'Réassurance', isUnique: true },
  { type: 'texte', label: 'Texte', isUnique: false, options: [
    { value: 'simple', label: 'Strates 50 50 simple' },
    { value: 'magazine', label: 'Strates colonnes magazine' },
    { value: 'mosaic', label: 'Strates 50 50 mosaïque' },
  ]},
  { type: 'video', label: 'Vidéo', isUnique: true },
  { type: 'flash', label: 'Flash actualités', isUnique: true, options: [
    { value: 'slider-flex', label: 'Flash slider 50 50 flex' },
    { value: 'slider-simple', label: 'Flash slider 50 50 simple' },
    { value: 'magazine', label: 'Flash magazine' },
  ]},
  { type: 'annonces', label: 'Annonces ref', isUnique: true },
  { type: 'logos', label: 'Logos partenaires', isUnique: true },
  { type: 'team', label: 'Présentation de l\'équipe', isUnique: true },
  { type: 'instagram', label: 'Feed instagram', isUnique: true },
];

export const NOTE_TEMPLATES: Record<string, any> = {
  diaporama: {
    slogan: "Diaporama slogan\nPhoto pleine largeur + slogan et baseline administrables",
    legende: "Diaporama légende\nDiaporama x…",
    contact: "Diaporama formulaire de contact\nGauche : Slogan sur la photo\nDroite : Formulaire sur la photo",
  },
  encarts: {
    mosaic: "Encart survol mosaïque\nEncart x…",
    exterior: "Encart extérieur\nEncart x…",
    slide: "Encart slide\nEncart x…",
    'slide-half': "Encart slide 50/50\nEncart x…",
  },
  texte: {
    simple: "Strates 50 50 simple\nGauche : Photo x1\nDroite : Titre + Texte + CTA 'En savoir plus'",
    magazine: "Strates colonnes magazine\nGauche : Photo x1\nDroite : Titre + Texte + CTA 'Découvrir notre savoir-faire'",
    mosaic: "Strates 50 50 mosaïque\nGauche : Titre + Texte + CTA 'Voir nos réalisations'\nDroite : Photo x2",
  },
  flash: {
    'slider-flex': "Flash slider 50 50 flex\nGauche : Photo\nDroite : Titre + Texte + CTA",
    'slider-simple': "Flash slider 50 50 simple\nGauche : Photo\nDroite : Titre + Texte + CTA",
    magazine: "Flash magazine\nGauche : Annonce flash info\nDroite : Annonces x3",
  },
  avis: "Avis client\nAvis x3\nSlide horizontal",
  video: "Vidéo\nIframe vidéo administrable",
  annonces: "Annonces ref x3\nRemontée d'annonces en automatique",
  logos: "Logos partenaires\nCarrousel de logos x10",
  team: "Présentation de l'équipe\nPhotos + Noms + Fonctions",
  instagram: "Feed Instagram\nGrille de 6 à 9 photos",
};