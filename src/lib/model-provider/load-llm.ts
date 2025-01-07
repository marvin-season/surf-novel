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
  const model = createModel(provider, config);
  console.log("model", model);
  return model;
};

export const createModel = (provider: string, config: Record<string, any>) => {
  switch (process.env.NEXT_LLM_PROVIDER || provider) {
    case ModelProvider.Ollama:
      return initOllamaProvider(config);
    case ModelProvider.Azure:
      return initAzureProvider(config);
    default:
      return initOllamaProvider({});
  }
};
