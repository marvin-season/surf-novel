import { fetchApi } from "../fetch";

// llm 相关
const llm = {
  list: <T>() => fetchApi<T>("/llm"),
};

export default llm;
