import { initOllamaProvider } from "./ollama-provider";
import { initAzureProvider } from "./azure-provider";
import { ModelProvider } from "@/types/model-provider";

export const loadLLM = (
  provider?: string,
  model?: string,
  endpoint?: string,
) => {
  console.log({ provider, model, endpoint });
  if (!provider) {
    throw new Error("Provider is not defined");
  }

  switch (provider) {
    case ModelProvider.Ollama:
      return initOllamaProvider({ model, endpoint });
    case ModelProvider.Azure:
      return initAzureProvider({ model });
    default:
      return initOllamaProvider({});
  }
};
