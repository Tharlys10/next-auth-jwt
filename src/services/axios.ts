import axios from "axios";
import { parseCookies } from "nookies";

export function getApiClient(ctx?: any) {
  const { '@NextAuth/token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333"
  });

  api.interceptors.request.use(config => {
    console.log("Data request: ", config);

    return config;
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}