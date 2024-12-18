const api = {
  notes: (await import("./notes")).default,
  auth: (await import("./auth")).default,
  //   favorites: import("./favorites"),
};

export default api;
