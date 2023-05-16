import fetch from "cross-fetch";

import { config } from "../../Config";

export const api = {
  post,
  get
};

async function post(path: string, body: Record<string, any>, query?: Record<string, any>) {
  const response = await fetch(getEndpoint(path, query), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return response.json();
}

async function get(path: string, query?: Record<string, any>) {
  const response = await fetch(getEndpoint(path, query));
  return response.json();
}

function getEndpoint(path: string, query: Record<string, any> = {}): string {
  const search: string[] = [];
  for (const key in query) {
    search.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
  }
  return `${config.sado.url}${path}${search.length ? `?${search.join("&")}` : ""}`;
}
