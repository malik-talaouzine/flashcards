import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

let authToken = null;

export const setToken = (token) => {
  authToken = token;
};

// request interceptor
API.interceptors.request.use((config) => {
  // skip login/register
  if (authToken && !config.url.includes("/login") && !config.url.includes("/register")) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return config;
});

export default API;
