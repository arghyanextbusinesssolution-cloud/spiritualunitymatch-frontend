import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

/* ─── Environment ──────────────────────────────────────────────────────────── */
const isDev = process.env.NODE_ENV === "development";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (isDev ? "http://localhost:5000/api" : "");

/* ─── Dev-only logger ─────────────────────────────────────────────────────── */
const log = isDev
  ? (label: string, data?: unknown) => console.log(label, data ?? "")
  : () => {};

const logError = isDev
  ? (label: string, data?: unknown) => console.error(label, data ?? "")
  : () => {};

/* ─── Axios Instance ──────────────────────────────────────────────────────── */
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 30_000, // 30 s global timeout
});

/* ─── Request Interceptor ─────────────────────────────────────────────────── */
api.interceptors.request.use((config) => {
  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const cookieToken = Cookies.get("token");
  const token = storedToken || cookieToken;

  log("📤 [API]", {
    method: config.method?.toUpperCase(),
    url: `${config.baseURL}${config.url}`,
    auth: !!token,
  });

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ─── Response Interceptor ────────────────────────────────────────────────── */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    log("📥 [API]", { url: response.config.url, status: response.status });
    return response;
  },
  (error) => {
    logError("❌ [API]", {
      url: `${error.config?.baseURL}${error.config?.url}`,
      status: error.response?.status,
      message: error.message,
      code: error.code,
    });

    if (error.response?.status === 401) {
      Cookies.remove("token");
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        // Avoid redirect loop on login page
        if (!window.location.pathname.startsWith("/auth")) {
          window.location.href = "/auth/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
