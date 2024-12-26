import { initOllamaProvider } from "./ollama-provider";
import { initAzureProvider } from "./azure-provider";

export const loadLLM = (provider: (undefined | string) = process.env.NEXT_LLM_PROVIDER, model: string) => {
    if(!provider) {
        throw new Error('Provider is not defined');
    }
    
    switch (provider) {
        case 'ollama':
            return initOllamaProvider({model});
        case 'azure':
            return initAzureProvider({model});
        default:
            return initOllamaProvider({model});
    }
  
}