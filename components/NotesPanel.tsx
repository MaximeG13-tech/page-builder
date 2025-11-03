
import React, { useState } from 'react';

interface NotesPanelProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ notes, onNotesChange }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(notes);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy notes: ', err);
        }
    };

    const handleClear = () => {
        onNotesChange('');
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="flex gap-2 p-3 border-b border-gray-200">
                 <button 
                    onClick={handleCopy}
                    className={`p-2 rounded-md transition-colors duration-200 ${isCopied ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`} 
                    aria-label="Copier"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                </button>
                <button onClick={handleClear} className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200" aria-label="Effacer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
            <textarea
                className="w-full flex-grow p-4 border-none resize-none text-sm text-gray-700 focus:outline-none placeholder-gray-400"
                placeholder="Prenez des notes ici..."
                value={notes}
                onChange={(e) => onNotesChange(e.target.value)}
            ></textarea>
        </div>
    );
};
