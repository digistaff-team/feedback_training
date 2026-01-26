import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    console.warn("API_KEY не найден в переменных окружения");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const refineFeedbackStatement = async (statement: string): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "AI Сервис недоступен: Отсутствует API Key.";

  try {
    const prompt = `
      Ты эксперт-коуч по лидерству, специализирующийся на эффективной обратной связи.
      Пользователь предоставит черновик отзыва/фидбека.
      Твоя задача:
      1. Проанализировать, является ли высказывание "Конкретным" (а не расплывчатым) и основанным на фактах, а не на мнениях.
      2. Если оно расплывчатое или содержит догадки/домыслы вместо фактов, полученных из наблюдения, перепиши его так, чтобы оно было конкретным и основанным на фактах.
      3. Кратко объясни, почему были сделаны изменения.
      
      Черновик пользователя: "${statement}"
      
      Отвечай на русском языке. Будь краток и полезен.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Не удалось сгенерировать совет.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ошибка подключения к AI Коучу. Проверьте соединение или API ключ.";
  }
};

export const suggestGrowQuestions = async (context: string, stage: string): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "AI Сервис недоступен.";

  try {
    const prompt = `
      Ты эксперт-коуч, использующий модель GROW.
      Пользователь находится на этапе "${stage}" обсуждения обратной связи.
      Контекст проблемы: "${context}".
      
      Сгенерируй 3 конкретных, сильных коучинговых вопроса, которые менеджер может задать сотруднику для проработки этого этапа.
      Отвечай на русском языке. Оформи в виде маркированного списка.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Не удалось сгенерировать вопросы.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ошибка подключения к AI Коучу.";
  }
};

export const analyzeGap = async (data: any): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "AI Сервис недоступен.";

  try {
    const prompt = `
      Ты аналитик эффективности персонала.
      У нас есть данные для анализа ситуации сотрудника.
      
      Вводные данные:
      1. Сотрудник: ${data.name}
      2. Задача: ${data.task}
      3. Стандарт (как должно быть): ${data.standard}
      4. Реальное поведение (факты): ${data.behavior}
      5. Последствия: ${data.outcomes}
      
      Твоя задача:
      1. Сформулируй одним предложением "Разрыв" (Gap) - четкую разницу между ожиданием и реальностью.
      2. Напиши пример "Вступительного слова" для менеджера, которое звучит объективно, безоценочно и опирается только на факты из пункта 4. Используй формулу: "Я заметил [факт], а нашим стандартом является [стандарт], это привело к [последствия]".
      
      Отвечай на русском языке. Используй Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Не удалось проанализировать ситуацию.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ошибка при анализе данных.";
  }
};
