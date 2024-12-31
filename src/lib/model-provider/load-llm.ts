import { initOllamaProvider } from "./ollama-provider";
import { initAzureProvider } from "./azure-provider";
import { ModelProvider } from "@/types/model-provider";
import { DynamicParamsType } from "@/components/settings/dynamic-form";

export const loadLLMFromSettings = (
  settings: Record<string, any | DynamicParamsType>,
) => {
  const provider = settings.name;
  const config: Record<string, any> = {};
  Object.entries(settings.dynamic_params as DynamicParamsType).forEach(
    ([key, value]) => {
      config[key] = value.value;
    },
  );
  console.log("config", config);
  return createModel(provider, config);
};

export const createModel = (provider: string, config: Record<string, any>) => {
  switch (provider) {
    case ModelProvider.Ollama:
      return initOllamaProvider(config);
    case ModelProvider.Azure:
      return initAzureProvider(config);
    default:
      return initOllamaProvider({});
  }
};
