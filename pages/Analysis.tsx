import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { analyzeGap } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const Analysis: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    task: '',
    standard: '',
    outcomes: '',
    behavior: '',
  });

  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = async () => {
    if (!formData.standard || !formData.behavior) return;
    setLoading(true);
    const result = await analyzeGap(formData);
    setAnalysisResult(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Анализ действий</h2>
        <p className="text-gray-600">
          Заполните форму ниже, чтобы структурировать факты перед разговором. 
          Четкое понимание разницы между стандартом и реальным поведением поможет вам оставаться объективным.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Сотрудник</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none" 
                placeholder="Имя сотрудника"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Задача или контекст</label>
              <input 
                type="text"
                name="task"
                value={formData.task}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Какая задача выполнялась?"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Стандарт (как должно быть)</label>
              <textarea 
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 bg-gray-50 text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Опишите стандарт, KPI или правильный порядок действий."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Действия (что произошло)</label>
              <textarea 
                name="behavior"
                value={formData.behavior}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 bg-gray-50 text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Опишите конкретные наблюдаемые факты (не мнения)."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Последствия действий</label>
            <textarea 
              name="outcomes"
              value={formData.outcomes}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 bg-gray-50 text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="Как это повлияло на бизнес, команду или сроки?"
            />
          </div>

          {/* AI Section */}
          <div className="border-t border-gray-100 pt-6 mt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
               <div className="text-sm text-gray-500 italic">
                 {!formData.standard || !formData.behavior 
                   ? 'Заполните все поля формы, опишите ситуацию, требующей обратной связи' 
                   : 'Нажмите на кнопку ниже, чтобы получить вариант фразы для начала диалога'}
               </div>
               <div className="flex gap-3">
                 <Button 
                   onClick={handleAnalyze} 
                   disabled={loading || !formData.standard || !formData.behavior}
                   className="bg-indigo-600 hover:bg-indigo-700 text-white"
                 >
                   {loading ? 'Анализирую...' : '✨ Первая фраза'}
                 </Button>
                 
                 <Button variant="secondary" onClick={() => window.location.hash = '#planning'}>
                   Далее (Шаг 3) &rarr;
                 </Button>
               </div>
            </div>

            {analysisResult && (
              <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-6 animate-fade-in shadow-inner">
                <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Как начать диалог:
                </h3>
                <div className="prose prose-sm prose-indigo max-w-none text-gray-800 bg-white p-4 rounded-lg border border-indigo-100">
                  <ReactMarkdown>{analysisResult}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};