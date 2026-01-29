import React, { useState } from 'react';
import { GROW_STEPS } from '../constants';
import { Button } from '../components/ui/Button';
import { suggestGrowQuestions } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const Discussion: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState('goal');
  const [aiContext, setAiContext] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const activeStep = GROW_STEPS.find(s => s.id === activeStepId) || GROW_STEPS[0];

  const handleGetSuggestions = async () => {
    if (!aiContext) return;
    setLoading(true);
    const suggestions = await suggestGrowQuestions(aiContext, activeStep.title);
    setAiSuggestions(suggestions);
    setLoading(false);
  };

  const handleNextStep = () => {
    const currentIndex = GROW_STEPS.findIndex(step => step.id === activeStepId);
    if (currentIndex !== -1 && currentIndex < GROW_STEPS.length - 1) {
      setActiveStepId(GROW_STEPS[currentIndex + 1].id);
      setAiSuggestions(null);
      setAiContext(''); // Очищаем поле ввода при переходе
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Проведение диалога</h2>
        <p className="text-sm text-gray-600 mt-2">Используйте метод <strong>GROW</strong> для структурирования беседы и достижения согласия.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation / Steps */}
        <div className="md:w-1/4">
          <div className="grid grid-cols-4 md:flex md:flex-col gap-2">
            {GROW_STEPS.map(step => (
              <button
                key={step.id}
                onClick={() => { setActiveStepId(step.id); setAiSuggestions(null); }}
                className={`
                  flex items-center justify-center md:items-start md:justify-start flex-col
                  px-2 py-3 md:px-4 rounded-lg transition-all
                  ${activeStepId === step.id 
                    ? 'bg-primary-600 text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}
                `}
              >
                {/* Mobile: Letter */}
                <span className="block md:hidden font-black text-xl">{step.title.charAt(0)}</span>
                {/* Desktop: Title */}
                <span className="hidden md:block font-bold text-lg text-left">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xl">
                 {activeStep.title.charAt(0)}
               </div>
               <h3 className="text-xl font-bold text-gray-800">Этап {activeStep.title}</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-6 text-lg">{activeStep.description}</p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Ключевые вопросы:
              </h4>
              <ul className="space-y-3">
                {activeStep.questions.map((q, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <span className="text-primary-500 font-bold">•</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Generator for Questions */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Нужны вопросы по ситуации?</h4>
              <p className="text-sm text-gray-500 mb-3">Опишите вашу конкретную ситуацию ниже, и AI предложит варианты вопросов.</p>
              
              <div className="flex flex-col gap-3">
                <textarea 
                  value={aiContext}
                  onChange={(e) => setAiContext(e.target.value)}
                  rows={3}
                  placeholder="например, Сотрудник талантливый, но постоянно опаздывает."
                  className="w-full p-2 bg-white text-sm text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                />
                <div className="flex justify-start">
                  <Button onClick={handleGetSuggestions} disabled={loading || !aiContext}>
                    {loading ? 'Создаю...' : 'Подсказать вопросы'}
                  </Button>
                </div>
              </div>

              {aiSuggestions && (
                <div className="mt-4 p-4 bg-indigo-50 text-indigo-900 rounded-lg border border-indigo-100 animate-fade-in">
                  <div className="prose prose-sm prose-indigo max-w-none">
                    <ReactMarkdown>{aiSuggestions}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
          
           <div className="mt-6 flex justify-end">
              {activeStepId !== 'will' && (
                <Button variant="outline" onClick={handleNextStep}>
                  Следующий этап &rarr;
                </Button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
