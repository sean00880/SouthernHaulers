'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

type DocumentType = 'POD' | 'BOL' | 'TIR' | 'Photo';

interface CapturedDocument {
  id: string;
  type: DocumentType;
  dataUrl: string;
  timestamp: string;
}

export default function CapturePage() {
  const [documents, setDocuments] = useState<CapturedDocument[]>([]);
  const [selectedType, setSelectedType] = useState<DocumentType>('POD');
  const [capturing, setCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleCapture = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCapturing(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const newDoc: CapturedDocument = {
          id: Date.now().toString(),
          type: selectedType,
          dataUrl,
          timestamp: new Date().toISOString(),
        };

        setDocuments([...documents, newDoc]);

        // TODO: Store in IndexedDB for offline support
        // TODO: Upload to server when online
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error capturing document:', error);
    } finally {
      setCapturing(false);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleSubmit = async () => {
    // TODO: Upload all documents to server
    // For now, just redirect back to dashboard
    router.push('/dashboard');
  };

  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case 'POD':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'BOL':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-800 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Capture Documents</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Document Type Selector */}
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-300">Document Type</label>
          <div className="grid grid-cols-4 gap-2">
            {(['POD', 'BOL', 'TIR', 'Photo'] as DocumentType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`py-3 rounded-lg font-medium transition-all ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-900 text-gray-400 border border-gray-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Capture Button */}
        <button
          onClick={handleCapture}
          disabled={capturing}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 rounded-xl font-medium text-lg transition-colors flex items-center justify-center gap-3 camera-button"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {capturing ? 'Capturing...' : 'Take Photo'}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Captured Documents */}
        {documents.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Captured Documents ({documents.length})</h2>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 rounded-lg bg-gray-900 border border-gray-800 flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                    <img src={doc.dataUrl} alt={doc.type} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getDocumentIcon(doc.type)}
                      <span className="font-medium">{doc.type}</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(doc.timestamp).toLocaleTimeString()}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-red-400"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-4 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors"
            >
              Upload {documents.length} Document{documents.length !== 1 ? 's' : ''}
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
          <h3 className="font-medium mb-2 text-gray-300">📋 Tips for Best Results</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Ensure good lighting</li>
            <li>• Capture the entire document</li>
            <li>• Keep the camera steady</li>
            <li>• Avoid shadows and glare</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
