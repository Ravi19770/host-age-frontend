import api from "../api/axios";

const ticketApi = api;

export const getTicketById = (id) =>
  ticketApi.get(`/api/tickets/${id}`);

export const getTicketMessages = (id) =>
  ticketApi.get(`/api/tickets/${id}/messages`);

export const replyTicket = (id, data) =>
  ticketApi.post(`/api/tickets/${id}/reply`, data);

export const updateTicket = (id, data) =>
  ticketApi.put(`/api/tickets/${id}`, data);

export const assignAgent = (id, agentId) =>
  ticketApi.put(`/api/tickets/${id}/assign`, {
    agentId,
  });

export const addInternalNote = (id, note) =>
  ticketApi.post(`/api/tickets/${id}/internal-note`, {
    note,
  });