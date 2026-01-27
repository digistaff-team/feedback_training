import React, { useState } from 'react';
import { ACHIEVE_MODEL } from '../constants';
import { Button } from '../components/ui/Button';

export const Planning: React.FC = () => {
  // Инициализируем состояние так, чтобы все факторы по умолчанию были "в наличии" (true)
  const [factorsPresent, setFactorsPresent] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    ACHIEVE_MODEL.forEach(item => {
      initialState[item.key] = true;
    });
    return initialState;
  });

  const toggleFactor = (key: string) => {
    setFactorsPresent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Вычисляем отсутствующие факторы (там, где галочка снята)
  const missingFactors = ACHIEVE_MODEL.filter(item => !factorsPresent[item.key]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Диагностика причин</h2>
        <p className="text-sm text-gray-600">
          Ниже перечислены факторы, необходимые сотруднику для успешной деятельности. 
          <strong> Снимите галочки</strong> с тех факторов, которых <strong>не хватает</strong> сотруднику.  
          Это поможет выявить корневые причины его действий и учитывать их в диалоге.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {ACHIEVE_MODEL.map((item) => {
            const isPresent = factorsPresent[item.key];
            const isMissing = !isPresent;

            return (
              <div 
                key={item.key} 
                className={`
                  bg-white rounded-xl shadow-sm border transition-all duration-200 cursor-pointer overflow-hidden
                  ${isMissing ? 'border-orange-400 ring-1 ring-orange-400 bg-orange-50' : 'border-gray-200 hover:border-primary-300'}
                `}
                onClick={() => toggleFactor(item.key)}
              >
                <div className="p-5 flex items-start gap-4">
                  {/* Checkbox Visual */}
                  <div className={`
                    w-6 h-6 rounded flex-shrink-0 flex items-center justify-center border mt-0.5 transition-colors
                    ${isPresent 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'bg-white border-orange-400 text-transparent'}
                  `}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-bold ${isMissing ? 'text-orange-900' : 'text-gray-800'}`}>
                        {item.name}
                      </h3>
                      {isMissing && <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">Проблема</span>}
                    </div>
                    <p className={`text-sm mt-1 ${isMissing ? 'text-orange-800' : 'text-gray-600'}`}>
                      {item.question}
                    </p>
                    
                    {/* Показываем решение, если фактор ОТСУТСТВУЕТ (галочка снята) */}
                    {isMissing && (
                      <div className="mt-4 pt-4 border-t border-orange-200 animate-fade-in">
                        <div className="text-xs font-bold text-orange-700 uppercase mb-1">Решение проблемы</div>
                        <p className="text-gray-800">{item.solution}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-indigo-900 text-white rounded-xl p-6 shadow-lg sticky top-6">
            <h3 className="text-xl font-bold mb-4">Что стоит предпринять</h3>
            {missingFactors.length === 0 ? (
              <div className="text-center py-6 text-indigo-200">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm italic">
                  Похоже, у сотрудника есть всё, что нужно для успешной работы.<br/>
                  Если проблема сохраняется, попробуйте пересмотреть пункты и снять галочки с тех, в которых вы сомневаетесь.
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xs text-indigo-300 uppercase font-semibold">Необходимые действия ({missingFactors.length}):</p>
                <ul className="space-y-4">
                  {missingFactors.map(item => (
                    <li key={item.key} className="text-sm border-l-2 border-orange-400 pl-3">
                      <span className="font-bold text-white block mb-1">{item.name}</span>
                      <span className="text-indigo-100 opacity-90">{item.solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-8">
              <Button variant="secondary" className="w-full text-indigo-900 font-semibold" onClick={() => window.location.hash = '#discussion'}>
                Далее (План диалога)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
