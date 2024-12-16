const api = {
  auth: (await import("./auth")).default,
  notes: (await import("./notes")).default,
  //   recent: import("./recent"),
  //   favorites: import("./favorites"),
};

export default api;
