
export async function fetchApi(
  url: string | URL | Request,
  options: Record<string, any> = {}
) {
  const accessToken: string | undefined = undefined;
  try {
    // const authData: { accessToken?: string } | null = getCache("authData");
    // accessToken = authData?.accessToken;
  } catch (error) {
    console.log("Error fetching authData from cache:", error);
  }

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
