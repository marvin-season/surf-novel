import { initOllamaProvider } from "./ollama-provider";
import { initAzureProvider } from "./azure-provider";
import { ModelProvider } from "@/types/model-provider";

export const loadLLM = (
  provider = process.env.NEXT_LLM_PROVIDER,
  model?: string,
) => {
  if (!provider) {
    throw new Error("Provider is not defined");
  }

  console.log("模型provider", provider);

  switch (provider) {
    case ModelProvider.Ollama:
      return initOllamaProvider({ model });
    case ModelProvider.Azure:
      return initAzureProvider({ model });
    default:
      return initOllamaProvider({ model });
  }
};
