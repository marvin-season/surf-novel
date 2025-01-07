import { createAzure } from "@ai-sdk/azure";

export function initAzureProvider({
  model,
  apiKey,
  baseURL,
}: {
  model?: string;
  apiKey?: string;
  baseURL?: string;
}) {
  const __model = process.env.NEXT_OPEN_MODEL_PREF || model;
  const __apiKey = process.env.NEXT_AZURE_OPENAI_KEY || apiKey;
  const __baseURL =
    `${process.env.NEXT_AZURE_OPENAI_ENDPOINT}/openai/deployments/` ||
    `${baseURL}/openai/deployments/`;
  if (!__model) {
    throw new Error("Model is not defined");
  }
  if (!__apiKey) {
    throw new Error("API Key is not defined");
  }
  if (!__baseURL) {
    throw new Error("Base URL is not defined");
  }
  const azure = createAzure({
    baseURL: __baseURL,
    apiKey: __apiKey,
  });

  return azure(__model);
}
