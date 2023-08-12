import api from './api';

export async function getBookingByUserId(token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } );
  return response.data;
};

export async function postBooking(body, token) {
  const response = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
