import { P } from "ts-pattern";

export const getModels = async (
  provider: "ollama" | "azure" = "ollama",
  url = "http://10.3.74.135:11434/api/tags",
) => {
  switch (provider) {
    case "ollama":
      const response = await fetch(url);
      const data = await response.json();
      return data?.models || [];
    default:
      return [];
  }
};
