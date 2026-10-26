import { apiClient } from "./client";

export const jobApi = {
  getAll: () => apiClient.get("/job/getall").then((res) => res.data),
  getById: (id) => apiClient.get(`/job/${id}`).then((res) => res.data),
  getMine: () => apiClient.get("/job/getmyjobs").then((res) => res.data),
  create: (payload) => apiClient.post("/job/post", payload).then((res) => res.data),
  update: (id, payload) =>
    apiClient.put(`/job/update/${id}`, payload).then((res) => res.data),
  remove: (id) => apiClient.delete(`/job/delete/${id}`).then((res) => res.data),
};
