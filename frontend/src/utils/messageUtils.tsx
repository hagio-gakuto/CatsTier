import { messages } from '../message';

export const getMessage = (id: string, params: Record<string, string> = {}): string => {
  // メッセージIDが存在しない場合はIDをそのまま返す
  let message = messages[id] || id;

  // 可変部分の置換
  for (const [key, value] of Object.entries(params)) {
    message = message.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }

  return message;
};
