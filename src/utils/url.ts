export const objectToSearchParams = (obj: Record<string, string>) =>
  Object.keys(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");
