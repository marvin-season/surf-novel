import { fetchApi } from "../fetch";

// 笔记相关
const notes = {
  list: <T>() => fetchApi<T>("/notes"),
  create: <T>(data: any) =>
    fetchApi<T>("/notes", {
      method: "POST",
      body: JSON.stringify(data),
      showSuccess: true,
      successMessage: "笔记创建成功",
    }),
  update: (id: string, data: any) =>
    fetchApi(`/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      showSuccess: true,
      successMessage: "笔记更新成功",
    }),
  delete: (id: string) =>
    fetchApi(`/notes/${id}`, {
      method: "DELETE",
      showSuccess: true,
      successMessage: "笔记删除成功",
    }),
  get: (id: string) => fetchApi(`/notes/${id}`),
};

export default notes;
