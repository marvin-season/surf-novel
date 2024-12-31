import { fetchApi } from "../fetch";

// llm 相关
const userConfig = {
  get: <T>() => fetchApi<T>("/user-config", { method: "GET" }),
  save: <T>(data: T) =>
    fetchApi<T>("/user-config", {
      showSuccess: true,
      successMessage: "保存成功",
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export default userConfig;
