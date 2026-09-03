import axios from "axios";

const API_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5200";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export const getTicketById = (id) =>
  api.get(`/tickets/${id}`);

export const getTicketMessages = (id) =>
  api.get(`/tickets/${id}/messages`);

export const replyTicket = (id, data) =>
  api.post(`/tickets/${id}/reply`, data);

export const updateTicket = (id, data) =>
  api.put(`/tickets/${id}`, data);

export const assignAgent = (id, agentId) =>
  api.put(`/tickets/${id}/assign`, {
    agentId,
  });

export const addInternalNote = (id, note) =>
  api.post(`/tickets/${id}/internal-note`, {
    note,
  });