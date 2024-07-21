export function getUrl(path?: String) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const normalizedPath =
    path && !path.startsWith("/") ? `/${path}` : path || "";
  return `${baseUrl}${normalizedPath}`;
}
