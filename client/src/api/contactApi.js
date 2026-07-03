import axios from "axios";

const API = axios.create({
  baseURL: "https://upadhyay-agritech-rvz5.vercel.app/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const submitContact = (data) => API.post("/contact", data);

export const getContacts = () => API.get("/contact");

export const markContactRead = (id) => API.patch(`/contact/${id}/read`);
