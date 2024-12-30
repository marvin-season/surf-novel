import { fetchApi } from "../fetch";

// llm 相关
const llm = {
  list: <T>(modelUrl: string) =>
    fetchApi(`/llm?modelUrl=${modelUrl}`, { method: "GET" }),
};

export default llm;
