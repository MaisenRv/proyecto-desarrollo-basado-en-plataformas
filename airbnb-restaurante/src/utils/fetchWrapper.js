export async function fetchWrapper(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.json();
    const error = new Error(`Error HTTP: ${response.status}`)
    error.data = errorText
    throw error
  }

  return response.json();
}