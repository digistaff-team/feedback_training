import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { QUIZ_DATA } from '../constants';
import { QuizQuestion } from '../types';

export const Evaluate: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'Observation' | 'Inference' | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (type: 'Observation' | 'Inference') => {
    setSelectedAnswer(type);
    setShowExplanation(true);
    if (type === QUIZ_DATA[activeQuestion].type) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (activeQuestion < QUIZ_DATA.length - 1) {
      setActiveQuestion(activeQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Тест завершен!</h2>
          <p className="text-xl text-gray-600 mb-8">
            Ваш результат: <span className="font-bold text-primary-600">{score}</span> из <span className="font-bold">{QUIZ_DATA.length}</span>.
          </p>
          <div className="p-4 bg-blue-50 rounded-lg text-left mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Главный вывод:</h3>
            <p className="text-blue-700">
              Эффективная обратная связь должна быть <strong>Конкретной</strong> и основанной на <strong>Наблюдениях</strong>.
              Избегайте слухов, обобщений и догадок о мотивах.
            </p>
          </div>
          <Button onClick={() => window.location.hash = '#analyze'}>Перейти к анализу</Button>
        </div>
      </div>
    );
  }

  const currentQ = QUIZ_DATA[activeQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Оценка ситуации</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-3">Опирайтесь в оценке ситуации на факты, а не на мнения.</h3>
          <div className="grid md:grid-cols-2 gap-8">
             <div>
               <h4 className="font-bold text-green-600 mb-2 flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                 Наблюдение/факты
               </h4>
               <p className="text-gray-600 text-sm">То, что вы видели непосредственно.</p>
               <p className="text-gray-600 text-sm">Фактическое и доказуемое.</p>
               <div className="mt-2 p-3 bg-green-50 rounded text-xs text-green-800 italic">
                 "Он пришел в 9:15 утра."
               </div>
             </div>
             <div>
               <h4 className="font-bold text-orange-600 mb-2 flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                 Догадки/мнения
               </h4>
               <p className="text-gray-600 text-sm">Домысливание того, что вы видели.</p>
               <p className="text-gray-600 text-sm">Приписывание мотивов.</p>
               <div className="mt-2 p-3 bg-orange-50 rounded text-xs text-orange-800 italic">
                 "Ему плевать на пунктуальность."
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Это факты или мнение? Потренируйтесь различать:</span>
          <span className="text-sm font-medium text-primary-600">Вопрос {activeQuestion + 1} из {QUIZ_DATA.length}</span>
        </div>
        
        <div className="p-8">
          <p className="text-lg font-medium text-gray-800 mb-8 leading-relaxed">
            "{currentQ.statement}"
          </p>

          {!showExplanation ? (
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => handleAnswer('Observation')}
                className="flex-1 py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 font-semibold text-gray-600 hover:text-green-700 transition-all"
              >
                Это факты
              </button>
              <button 
                onClick={() => handleAnswer('Inference')}
                className="flex-1 py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 font-semibold text-gray-600 hover:text-orange-700 transition-all"
              >
                Это мнение
              </button>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className={`p-4 rounded-lg mb-6 ${selectedAnswer === currentQ.type ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {selectedAnswer === currentQ.type ? (
                    <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Верно!</>
                  ) : (
                    <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> Неверно.</>
                  )}
                </div>
                Это <strong>{currentQ.type === 'Observation' ? 'Факты' : 'Мнение'}</strong>.
              </div>
              <p className="text-gray-600 mb-6">{currentQ.explanation}</p>
              <div className="flex justify-end">
                <Button onClick={nextQuestion}>
                  {activeQuestion === QUIZ_DATA.length - 1 ? 'Завершить тест' : 'Следующий вопрос'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
