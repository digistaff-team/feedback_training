import React, { useState } from 'react';
import { Button } from '../components/ui/Button';

interface TheoryCardData {
  id: number;
  category: string;
  title: string;
  content: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const THEORY_DATA: TheoryCardData[] = [
  {
    id: 1,
    category: 'Ситуация',
    title: 'Факты вместо мнений',
    content: 'Эффективная обратная связь строится на неоспоримых фактах (видел, слышал, читал), а не на интерпретациях. Мнения вызывают защитную реакцию, факты приглашают к диалогу.',
    question: 'Какое утверждение является ФАКТОМ?',
    options: ['Ты безответственно подошел к отчету', 'Ты сдал отчет на 2 дня позже срока'],
    correctIndex: 1,
    explanation: 'Верно! "Опоздание на 2 дня" — это измеримый факт. "Безответственность" — это ваша оценка поведения.'
  },
  {
    id: 2,
    category: 'Действия',
    title: 'Оценка действий',
    content: 'Прежде чем давать обратную связь, определите различие между тем, как должно быть, и тем, как есть по факту. Это помогает сделать разговор объективным, а не эмоциональным.',
    question: 'Что лучше сказать в начале разговора?',
    options: ['Почему ты постоянно нарушаешь сроки?', 'Нашим стандартом является сдача до 18:00, но файл пришел в 20:30.'],
    correctIndex: 1,
    explanation: 'Именно. Вторая фраза просто констатирует разрыв между ожиданием и реальностью, не обвиняя человека.'
  },
  {
    id: 3,
    category: 'Причины',
    title: 'Анализ причин',
    content: 'Не всегда виновата лень. Часто причина в отсутствии навыков, неясных целях или нехватке ресурсов. Проверьте эти факторы до разговора.',
    question: 'Сотрудник старается, но делает ошибки в новой программе. Какая это проблема?',
    options: ['Не хватает ему мотивации', 'Слабые навыки, нет обучения'],
    correctIndex: 1,
    explanation: 'Правильно. Если человек хочет (есть старание), но не может — ему нужно обучение, а не мотивационная беседа.'
  },
  {
    id: 4,
    category: 'Диалог',
    title: 'Модель GROW',
    content: 'Не давайте готовых советов сразу. Действуйте по шагам: Goal (Цель), Reality (Реальность), Options (Варианты), Will (Намерение). Это учит сотрудника думать самостоятельно.',
    question: 'На каком этапе GROW-диалога уместен вопрос: "Что ты уже пробовал сделать для решения этой задачи?"',
    options: ['Reality (Реальность)', 'Options (Варианты)'],
    correctIndex: 1,
    explanation: 'Верно. На этапе Options мы исследуем варианты и ищем новые пути решения.'
  }
];

export const Theory: React.FC = () => {
  const [answeredState, setAnsweredState] = useState<Record<number, number | null>>({});

  const handleAnswer = (cardId: number, optionIndex: number) => {
    setAnsweredState(prev => ({ ...prev, [cardId]: optionIndex }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Теория за 5 минут</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ключевые моменты по теме обратной связи в формате быстрых карточек. Проверьте своё понимание.
        </p>
      </div>

      <div className="grid gap-8">
        {THEORY_DATA.map((item) => {
          const userAnswer = answeredState[item.id];
          const isAnswered = userAnswer !== undefined && userAnswer !== null;
          const isCorrect = userAnswer === item.correctIndex;

          return (
            <div key={item.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="md:flex">
                {/* Theory Section */}
                <div className="p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-100 bg-gradient-to-br from-white to-gray-50">
                  <span className="text-lg font-bold tracking-wider uppercase text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mt-3 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {item.content}
                  </p>
                </div>

                {/* Quiz Section */}
                <div className="p-8 md:w-1/2 flex flex-col justify-center bg-white">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Проверьте себя:
                  </h4>
                  <p className="text-gray-800 font-medium mb-4 italic">"{item.question}"</p>
                  
                  <div className="space-y-3">
                    {!isAnswered ? (
                      item.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(item.id, idx)}
                          className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all text-sm font-medium text-gray-700"
                        >
                          {option}
                        </button>
                      ))
                    ) : (
                      <div className={`p-4 rounded-lg animate-fade-in ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        <div className="flex items-center gap-2 font-bold mb-2">
                          {isCorrect ? (
                            <div className="text-green-700 flex items-center gap-1">
                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                               Верно!
                            </div>
                          ) : (
                            <div className="text-red-700 flex items-center gap-1">
                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                               Ошибка
                            </div>
                          )}
                        </div>
                        <p className={`text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                          {item.explanation}
                        </p>
                        {!isCorrect && (
                           <button 
                             onClick={() => setAnsweredState(prev => ({...prev, [item.id]: null}))}
                             className="text-xs underline mt-2 text-red-600 hover:text-red-800"
                           >
                             Попробовать снова
                           </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center bg-indigo-900 rounded-xl p-8 text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-3">Готовы применить знания?</h3>
        <p className="text-indigo-200 mb-6">Переходите к практике!</p>
        <Button 
            size="lg" 
            className="bg-white text-indigo-900 hover:bg-gray-100 border-none"
            onClick={() => window.location.hash = '#evaluate'}
        >
            Начать практику
        </Button>
      </div>
    </div>
  );
};
