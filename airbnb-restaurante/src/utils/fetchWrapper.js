export async function fetchWrapper(url, options = {}, contentType = "application/json") {
  const isFormData = options.body instanceof FormData;

  const response = await fetch(url, {
    ...options,
    headers: isFormData
      ? options.headers
      : {
        "Content-Type": contentType,
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