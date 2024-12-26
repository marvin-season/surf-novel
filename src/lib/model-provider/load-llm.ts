import { initOllamaProvider } from "./ollama-provider";
import { initAzureProvider } from "./azure-provider";

export const loadLLM = (provider: string, model: string) => {
    
    switch (provider) {
        case 'ollama':
            return initOllamaProvider({model});
        case 'azure':
            return initAzureProvider({model});
        default:
            return initOllamaProvider({model});
    }
  
}