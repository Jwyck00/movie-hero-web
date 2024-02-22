import axios, { AxiosInstance } from "axios";

const apiService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export { apiService };
