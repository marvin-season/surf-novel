import { llmApi } from "@/lib/api";
import { LLMApiResponse } from "@/types/llm";

export const getModelProviderList = async () => {
  return (await llmApi.list<LLMApiResponse>())?.providers || [];
};
