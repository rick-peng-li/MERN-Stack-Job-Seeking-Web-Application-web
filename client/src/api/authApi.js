import { apiClient } from "./client";

export const authApi = {
  register: (payload) => apiClient.post("/user/register", payload).then((res) => res.data),
  login: (payload) => apiClient.post("/user/login", payload).then((res) => res.data),
  logout: () => apiClient.get("/user/logout").then((res) => res.data),
  getMe: () => apiClient.get("/user/getuser").then((res) => res.data),
};
