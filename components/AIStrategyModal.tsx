import React, { useState, useRef } from 'react';

interface AIStrategyModalProps {
  isOpen: boolean;
  isGenerating: boolean;
  error: string | null;
  onGenerate: (description: string, jsonContent: string | null) => void;
  onClose: () => void;
}

const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(file);
  });
};

export const AIStrategyModal: React.FC<AIStrategyModalProps> = ({ isOpen, isGenerating, error, onGenerate, onClose }) => {
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/json') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      if (file) {
        alert("Veuillez sélectionner un fichier au format JSON.");
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGenerateClick = async () => {
    if (description.trim()) {
      let jsonContent: string | null = null;
      if (selectedFile) {
        try {
          jsonContent = await readFileContent(selectedFile);
        } catch (e) {
          console.error("Error reading file:", e);
          // Optionally show an error to the user
          return;
        }
      }
      onGenerate(description, jsonContent);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Construisons votre page idéale</h3>
            <p className="text-sm text-gray-600">Décrivez votre activité, puis ajoutez un fichier JSON de contexte (optionnel) pour une structure encore plus précise.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mt-2 -mr-2 text-2xl" aria-label="Fermer">&times;</button>
        </div>
        
        <div className="mt-4 space-y-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: 'Je suis un artisan plombier à Marseille. Je cible les particuliers pour des rénovations de salle de bain et des dépannages urgents...'"
            className="w-full h-32 p-3 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={isGenerating}
          />

          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
              Contexte additionnel (JSON, optionnel)
            </label>
            {!selectedFile ? (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-input" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Téléchargez un fichier</span>
                      <input id="file-input" name="file-input" type="file" className="sr-only" accept="application/json" onChange={handleFileChange} ref={fileInputRef} disabled={isGenerating} />
                    </label>
                    <p className="pl-1">ou glissez-déposez</p>
                  </div>
                  <p className="text-xs text-gray-500">Fichier JSON uniquement</p>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-between p-2 bg-gray-100 border border-gray-200 rounded-md">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium truncate">{selectedFile.name}</span>
                </div>
                <button onClick={handleRemoveFile} className="text-gray-500 hover:text-red-600 transition-colors" disabled={isGenerating}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex flex-col sm:flex-row gap-2 justify-end mt-4">
          <button
            onClick={onClose}
            className="py-2 px-4 border border-gray-200 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={isGenerating}
          >
            Commencer manuellement
          </button>
          <button
            onClick={handleGenerateClick}
            className="py-2 px-4 border border-transparent rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isGenerating || !description.trim()}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Génération en cours...
              </>
            ) : (
             "Générer la structure"
            )}
          </button>
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
