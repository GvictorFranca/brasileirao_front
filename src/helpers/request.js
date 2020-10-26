export function fetchRequest(url, method, content, token) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token && `Bearer ${token}`,
      credentials: "include",
    },
    body: JSON.stringify(content),
  });
}
