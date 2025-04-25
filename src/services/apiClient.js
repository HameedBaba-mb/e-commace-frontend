import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_SERVER,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
  },
});

export default apiClient;
