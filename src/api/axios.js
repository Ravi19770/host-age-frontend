import axios from "axios";

const API_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "http://localhost:5200";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {
      console.error(
        "AUTH ERROR:",
        error.response?.data
      );
    }

    return Promise.reject(error);
  }
);

export default api;