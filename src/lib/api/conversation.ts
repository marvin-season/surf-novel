import { fetchApi } from "../fetch";

// message 相关
const conversation = {
  listMessage: <T>(conversationId: string) =>
    fetchApi<T>(`/message?conversationId=${conversationId}`, { method: "GET" }),
};

export default conversation;
