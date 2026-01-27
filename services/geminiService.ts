const getEnvVar = (key: string): string | undefined => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      return process.env[key];
    }
  } catch (e) {
    console.warn(`Ошибка доступа к process.env.${key}`, e);
  }
  return undefined;
};

const BOT_TOKEN = getEnvVar('BOT_TOKEN');
const BOT_ID = getEnvVar('BOT_ID');

// Генерируем или получаем существующий ID чата для сохранения контекста сессии
const getChatId = (): string => {
  const key = 'protalk_chat_id';
  let chatId: string | null = null;
  try {
    chatId = localStorage.getItem(key);
    if (!chatId) {
      chatId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(key, chatId);
    }
  } catch (e) {
    // Fallback если localStorage недоступен
    chatId = 'temp_' + Math.random().toString(36).substr(2, 9);
  }
  return chatId!;
};

// Общая функция отправки сообщения в Pro-Talk API
const sendProTalkMessage = async (message: string): Promise<string> => {
  if (!BOT_TOKEN || !BOT_ID) {
    console.warn("BOT_TOKEN or BOT_ID missing in environment variables.");
    return "Ошибка конфигурации: Не задан токен или ID бота.";
  }

  try {
    const response = await fetch(`https://api.pro-talk.ru/api/v1.0/ask/${BOT_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: parseInt(BOT_ID, 10), // API требует integer
        chat_id: getChatId(),
        message: message
      })
    });

    if (!response.ok) {
      if (response.status === 401) return "Ошибка авторизации: Неверный токен бота.";
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.done || "Бот вернул пустой ответ.";

  } catch (error: any) {
    console.error("Pro-Talk API Error:", error);
    return `Ошибка соединения с AI: ${error.message || 'Неизвестная ошибка'}`;
  }
};

export const refineFeedbackStatement = async (statement: string): Promise<string> => {
  const prompt = `
    Ты эксперт, специализирующийся на эффективной обратной связи.
    Пользователь предоставит черновик отзыва/фидбека.
    Твоя задача:
    1. Проанализировать, является ли высказывание "Конкретным" (а не расплывчатым) и основанным на фактах, а не на мнениях.
    2. Если оно расплывчатое или содержит догадки/домыслы вместо фактов, полученных из наблюдения, перепиши его так, чтобы оно было конкретным и основанным на фактах.
    3. Кратко объясни, почему были сделаны изменения.
    
    Черновик пользователя: "${statement}"
    
    Отвечай на русском языке. Будь краток и полезен.
  `;

  return await sendProTalkMessage(prompt);
};

export const suggestGrowQuestions = async (context: string, stage: string): Promise<string> => {
  const prompt = `
    Ты эксперт-коуч, использующий модель GROW.
    Пользователь находится на этапе "${stage}" обсуждения обратной связи.
    Контекст проблемы: "${context}".
    
    Сгенерируй 3 кратких конкретных, сильных коучинговых вопроса, которые менеджер может задать сотруднику для проработки этого этапа.
    Отвечай на русском языке. Оформи в виде маркированного списка.
  `;

  return await sendProTalkMessage(prompt);
};

export const analyzeGap = async (data: any): Promise<string> => {
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

  return await sendProTalkMessage(prompt);
};
