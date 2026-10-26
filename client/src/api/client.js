import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

// Extract response data and normalize error messages in one place
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong.";
    return Promise.reject(new Error(message));
  }
);
