// Base URL of the Express backend.
// Locally it defaults to http://localhost:5000.
// On Vercel, set NEXT_PUBLIC_API_URL (e.g. https://your-server.onrender.com)
// in Project Settings > Environment Variables, then redeploy.
export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
).replace(/\/+$/, "");

export const apiUrl = (path: string) =>
  `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
