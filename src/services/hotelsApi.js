import api from './api';

export async function getHotels(token, userId) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }, { userId });
  return response.data;
};

export async function getHotelsRooms(token, hotelId) {
  const response = await api.get(`/hotels/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }, { hotelId });
  return response.data;
}
//
