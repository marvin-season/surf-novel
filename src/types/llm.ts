export interface LLMApiResponse {
    providers: {
        id: string;
        name: string;
        lLMModel: {
            id: string;
            name: string;
        }[];
    }[];
}