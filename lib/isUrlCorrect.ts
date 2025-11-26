export const isUrlCorrect = (url: string) => {
  const urlRegex = url.includes(".") || url.endsWith(".");
  return urlRegex;
};
