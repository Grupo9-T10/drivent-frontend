import api from './api';

export async function sendPay(ticketId, cardData) {
  const response = await api.post('/payments/process', { ticketId, cardData });
  return response.data;
}