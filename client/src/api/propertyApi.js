import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProperties = (params = {}) =>
  API.get("/properties", { params });

export const getPropertyById = (id) => API.get(`/properties/${id}`);

export const addProperty = (data) => API.post("/properties", data);

export const updateProperty = (id, data) => API.put(`/properties/${id}`, data);

export const deleteProperty = (id) => API.delete(`/properties/${id}`);