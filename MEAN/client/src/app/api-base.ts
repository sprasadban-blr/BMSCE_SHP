/*
  Localhost: empty string so HttpClient uses /api and proxy.conf.json.
  Module 6 (Vercel): paste your API project URL (no trailing slash) into PRODUCTION_API.
*/
const PRODUCTION_API = "";

export const API_BASE =
  typeof location !== "undefined" &&
  location.hostname !== "localhost" &&
  location.hostname !== "127.0.0.1"
    ? PRODUCTION_API
    : "";

export function apiUrl(path: string) {
  return `${API_BASE}${path}`;
}
