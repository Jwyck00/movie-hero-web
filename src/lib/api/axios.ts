import { SECURITY_TOKEN_KEY } from "@/features/auth/AuthProvider";
import axios, { AxiosInstance, type InternalAxiosRequestConfig } from "axios";

const apiService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiService.interceptors.request.use(setupToken);

async function setupToken(config: InternalAxiosRequestConfig<any>) {
  const token = localStorage.getItem(SECURITY_TOKEN_KEY);

  if (token) {
    config.headers.set("Authorization", token);
  }

  return config;
}

export { apiService };

