import { apiClient } from "./client";

export const applicationApi = {
  apply: (formData) =>
    apiClient
      .post("/application/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),
  getAllForEmployer: () =>
    apiClient.get("/application/employer/getall").then((res) => res.data),
  getAllForSeeker: () =>
    apiClient.get("/application/jobseeker/getall").then((res) => res.data),
  remove: (id) =>
    apiClient.delete(`/application/delete/${id}`).then((res) => res.data),
};
