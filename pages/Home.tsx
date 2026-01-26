import React from 'react';
import { Button } from '../components/ui/Button';

interface HomeProps {
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="h-64 bg-gradient-to-r from-primary-800 to-primary-600 relative overflow-hidden">
           <img 
            src="https://i.ibb.co/5hQHrP2x/66x200.jpg" 
            alt="Nature birds" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white">
            <h1 className="text-2xl md:text-5xl font-bold mb-4">Обратная связь</h1>
            <p className="text-lg md:text-lg text-primary-100 max-w-xl">
              Освойте искусство предоставления обратной связи, чтобы создать мотивированную и продуктивную команду.
            </p>
          </div>
        </div>
        
        <div className="p-8 md:p-12">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">Почему нам трудно давать обратную связь?</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Давать честную обратную связь, особенно корректирующую, может быть весьма непросто. Как сказать коллеге, что он делает что-то не так, сохранив при этом отношения?
            Ключ в том, чтобы быть <strong>объективным</strong> и помогать человеку найти собственное решение.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Объективная оценка</h3>
              <p className="text-sm text-gray-600">Научитесь отличать факты от мнений, чтобы исключить предвзятость.</p>
            </div>
            <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100">
               <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Анализ причин</h3>
              <p className="text-sm text-gray-600">Используйте модель ACHIEVE для поиска причин.</p>
            </div>
            <div className="p-5 bg-indigo-100 rounded-xl border border-indigo-200">
               <div className="w-10 h-10 bg-indigo-200 text-indigo-700 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Проведение диалога</h3>
              <p className="text-sm text-gray-600">Применяйте метод GROW для проведения бесед и достижения согласия.</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={onStart}
              className="bg-gradient-to-r from-blue-50 to-indigo-100 !text-indigo-900 border border-indigo-200 hover:from-blue-100 hover:to-indigo-200 shadow-md hover:shadow-lg transition-all"
            >
              Начать обучение
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
