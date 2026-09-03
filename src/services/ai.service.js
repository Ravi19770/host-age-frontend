import axios from "axios";

const API_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5200";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessage = async (message) => {
    console.log("MESSAGE:", message);
  console.log("TYPE:", typeof message);
  console.log("IS STRING:", typeof message === "string");
  const { data } = await api.post("/api/ai/chat", {
    message,
  });

  return data;
};