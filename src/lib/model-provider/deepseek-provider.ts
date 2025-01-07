import { createDeepSeek } from "@ai-sdk/deepseek";

export function initDeepSeek({
  model,
  apiKey,
  baseURL,
}: {
  model?: string;
  apiKey?: string;
  baseURL?: string;
}) {
  const __model = process.env.NEXT_DEEPSEEK_MODEL_ID || model;
  const __apiKey = process.env.NEXT_DEEPSEEK_API_KEY || apiKey;
  const __baseURL = `${process.env.NEXT_DEEPSEEK_BASE_URL}` || `${baseURL}`;
  if (!__model) {
    throw new Error("Model is not defined");
  }
  if (!__apiKey) {
    throw new Error("API Key is not defined");
  }
  if (!__baseURL) {
    throw new Error("Base URL is not defined");
  }
  const deepseek = createDeepSeek({
    baseURL: __baseURL,
    apiKey: __apiKey,
  });

  return deepseek(__model);
}
