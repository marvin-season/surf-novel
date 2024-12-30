import { fetchApi } from "../fetch";

// llm 相关
const llm = {
  list: <T>() => fetchApi("/llm", { method: "GET" }),
};

export default llm;
