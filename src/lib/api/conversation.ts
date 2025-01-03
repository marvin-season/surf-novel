import { fetchApi } from "../fetch";

// conversation 相关
const conversation = {
  list: <T>() => fetchApi<T>(`/conversation`),
  listMessage: <T>(conversationId: string) =>
    fetchApi<T>(`/message?conversationId=${conversationId}`),
  create: <T>() =>
    fetchApi<T>("/conversation", {
      method: "POST",
    }),
};

export default conversation;
