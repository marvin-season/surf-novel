import { fetchApi } from "../fetch";

// conversation 相关
const conversation = {
  list: <T>() => fetchApi<T>(`/conversation`),
  listMessage: <T>(conversationId: string) =>
    fetchApi<T>(`/message?conversationId=${conversationId}`),
};

export default conversation;
