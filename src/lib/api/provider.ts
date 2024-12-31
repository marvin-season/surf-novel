import { fetchApi } from "../fetch";

// provider 相关
const provider = {
  list: <T>() => fetchApi<T>(`/provider-list`, { method: "GET" }),
};

export default provider;
