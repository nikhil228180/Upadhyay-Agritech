import axios from "axios";

const API = axios.create({
  baseURL: "https://upadhyay-agritech-rvz5.vercel.app/api",
});

export const loginUser = (data) => API.post("/auth/login", data);

export const registerUser = (data) => API.post("/auth/register", data);

export const getMe = (token) =>
  API.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
