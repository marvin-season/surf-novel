import { createOllama } from "ollama-ai-provider";

export function initOllamaProvider({
  model,
  endpoint,
}: {
  model?: string;
  endpoint?: string;
}) {
  if (!model) {
    throw new Error("Model is not defined");
  }

  if (!endpoint) {
    throw new Error("Endpoint is not defined");
  }
  const ollama = createOllama({
    baseURL: `${endpoint}/api`,
  });

  return ollama(model);
}
