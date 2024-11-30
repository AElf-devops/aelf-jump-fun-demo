type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  queryParams?: Record<string, string | number>;
};

export const fetcher = async <T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { method = "GET", headers = {}, body, queryParams } = options;
  const queryString = queryParams
    ? "?" +
      new URLSearchParams(
        Object.entries(queryParams).map(([key, value]) => [key, String(value)])
      ).toString()
    : "";

  const response = await fetch(url + queryString, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorMessage = `Error: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
};
