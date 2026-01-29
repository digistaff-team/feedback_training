import React, { useState } from 'react';
import { Button } from './ui/Button';
import { refineFeedbackStatement } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const AICoach: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRefine = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(null);
    const result = await refineFeedbackStatement(input);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="fixed rounded-xl bottom-6 right-0 z-50 flex flex-col items-end pointer-events-none">
      <div className={`
        bg-white rounded-xl shadow-2xl border border-gray-200 w-80 md:w-96 max-h-[80vh] flex flex-col mb-4 transition-all duration-300 pointer-events-auto
        ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 h-0 mb-0 overflow-hidden'}
      `}>
        <div className="bg-gradient-to-r from-indigo-600 to-primary-600 p-4 text-white flex justify-between items-center flex-shrink-0">
          <div className="font-semibold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            AI Коуч
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-4 bg-gray-50 overflow-y-auto flex-1">
          <p className="text-sm text-gray-600 mb-3">
            Хотите проверить себя? Напишите, что вы планируете сказать сотруднику, и я скажу, что можно улучшить.
          </p>
          <textarea
            className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none mb-3 resize-none"
            rows={3}
            placeholder="Иван, ты очень ленивый и плохо работаешь!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            onClick={handleRefine} 
            disabled={loading || !input.trim()} 
            className="w-full"
            size="sm"
          >
            {loading ? 'Анализирую...' : 'Отправить'}
          </Button>
          
          {response && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-indigo-100 text-sm text-gray-700 shadow-sm animate-fade-in">
              <div className="font-semibold text-indigo-700 mb-2">Совет коуча:</div>
              <div className="prose prose-sm prose-indigo max-w-none leading-relaxed">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          pointer-events-auto flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-primary-600 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all
          ${isOpen ? 'opacity-0 scale-90 hidden' : 'opacity-100 scale-100'}
        `}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
        <span className="font-medium">🤓 AI Коуч</span>
      </button>
    </div>
  );
};
