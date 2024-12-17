const api = {
  notes: (await import("./notes")).default,
  //   recent: import("./recent"),
  //   favorites: import("./favorites"),
};

export default api;
