export const getModels = async (url = "http://10.3.74.135:11434/api/tags") => {
  const response = await fetch(url);
  const data = await response.json();
  return data?.models || [];
};
