import { createOllama } from "ollama-ai-provider";

export function initOllamaProvider({
  model = process.env.NEXT_OLLAME_LLM_MODEL,
}: {
  model?: string;
}) {
  if (!model) {
    throw new Error("Model is not defined");
  }

  console.log("model", model);

  const endpoint = process.env.NEXT_OLLAMA_ENDPOINT;
  if (!endpoint) {
    throw new Error("Endpoint is not defined");
  }
  const ollama = createOllama({
    baseURL: `${endpoint}/api`,
  });

  return ollama(model);
}
