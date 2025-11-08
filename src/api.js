export const BASE_API = "https://69016a73ff8d792314bd67df.mockapi.io/api/reducercrud";

export async function apiGet(endpoint) {
  const res = await fetch(`${BASE_API}/${endpoint}`);
  if (!res.ok) throw new Error("Error fetching " + endpoint);
  return res.json();
}

export async function apiPost(endpoint, body) {
  const res = await fetch(`${BASE_API}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Error posting to " + endpoint);
  return res.json();
}

export async function apiPut(endpoint, id, body) {
  const res = await fetch(`${BASE_API}/${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Error putting to " + endpoint);
  return res.json();
}

export async function apiDelete(endpoint, id) {
  const res = await fetch(`${BASE_API}/${endpoint}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Error deleting " + endpoint);
  return res.json();
}
