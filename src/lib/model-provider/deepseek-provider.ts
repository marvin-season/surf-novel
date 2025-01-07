import { createDeepSeek } from "@ai-sdk/deepseek";

export function initDeepSeek({
  deepseek_model_id,
  deepseek_api_key,
  deepseek_baseurl,
}: {
  deepseek_model_id?: string;
  deepseek_api_key?: string;
  deepseek_baseurl?: string;
}) {
  const model = process.env.NEXT_DEEPSEEK_MODEL_ID || deepseek_model_id;
  const apiKey = process.env.NEXT_DEEPSEEK_API_KEY || deepseek_api_key;
  const baseURL = process.env.NEXT_DEEPSEEK_BASE_URL || deepseek_baseurl;
  if (!model) {
    throw new Error("Model is not defined");
  }
  if (!apiKey) {
    throw new Error("API Key is not defined");
  }
  if (!baseURL) {
    throw new Error("Base URL is not defined");
  }
  const deepseek = createDeepSeek({
    baseURL,
    apiKey,
  });

  return deepseek(model);
}
