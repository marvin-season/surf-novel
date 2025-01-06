import { serverFetchApi } from "../server-fetch";

// conversation 相关
const conversation = {
  list: <T>() => serverFetchApi<T>(`/conversation`),
  listMessage: <T>(conversationId: string) =>
    serverFetchApi<T>(`/message?conversationId=${conversationId}`),
  create: <T>() =>
    serverFetchApi<T>("/conversation", {
      method: "POST",
    }),
};

export default conversation;
