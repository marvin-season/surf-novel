import { createAzure } from '@ai-sdk/azure';

export function initAzureProvider({
    model = process.env.NEXT_OPEN_MODEL_PREF,
    apiKey = process.env.NEXT_AZURE_OPENAI_KEY,
    baseURL = `${process.env.NEXT_AZURE_OPENAI_ENDPOINT}/openai/deployments/`,
}: {
    model?: string;
    apiKey?: string;
    baseURL?: string;
}) {
    if (!model) {
        throw new Error('Model is not defined');
    }
    if (!apiKey) {
        throw new Error('API Key is not defined');
    }
    if (!baseURL) {
        throw new Error('Base URL is not defined');
    }
    const azure = createAzure({
        baseURL,
        apiKey,
    });

    return azure(model);
}
