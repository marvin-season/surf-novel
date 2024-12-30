export const getModels = async (url: string) => {
  const response = await fetch(`${url}/api/tags`);
  const data = await response.json();
  return data?.models || [];
};
