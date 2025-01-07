import { createAzure } from "@ai-sdk/azure";

export function initAzureProvider({
  open_model_pref,
  azure_openai_key,
  azure_openai_endpoint,
}: {
  open_model_pref?: string;
  azure_openai_key?: string;
  azure_openai_endpoint?: string;
}) {
  const model = process.env.NEXT_OPEN_MODEL_PREF || open_model_pref;
  const apiKey = process.env.NEXT_AZURE_OPENAI_KEY || azure_openai_key;
  const baseURL =
    `${process.env.NEXT_AZURE_OPENAI_ENDPOINT}/openai/deployments/` ||
    `${azure_openai_endpoint}/openai/deployments/`;
  if (!model) {
    throw new Error("Model is not defined");
  }
  if (!apiKey) {
    throw new Error("API Key is not defined");
  }
  if (!baseURL) {
    throw new Error("Base URL is not defined");
  }
  const azure = createAzure({
    baseURL,
    apiKey,
  });

  return azure(model);
}
