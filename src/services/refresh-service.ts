import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function refreshAccessRefreshTokens(
  refreshToken: string,
): Promise<{ access_token: string; refresh_token: string }> {
  const client = axios.create({
    timeout: 120000,
    baseURL: `${API_BASE_URL}/api/v1`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const resp = await client.post<{
    data: { access_token: string; refresh_token: string };
  }>("/auth/refresh");
  return resp.data.data;
}
