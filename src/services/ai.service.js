import axios from "axios";
import API_URL from "../config/api";

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