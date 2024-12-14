import apiClient from './base.ts';

// Создать бронирование
export const createBooking = (data: { location_id: string, date: string, time: string }) => {
  return apiClient.post('/bookings', data);
};

// Получить бронирования текущего пользователя
export const getUserBookings = () => {
  return apiClient.get('/bookings');
};

// Получить все бронирования (только для админа)
export const getAllBookings = () => {
  return apiClient.get('/bookings/all');
};

// Обновить бронирование (только для админа)
export const updateBooking = (id: string, data: { date: string }) => {
  return apiClient.patch(`/bookings/${id}`, data);
};

// Удалить бронирование
export const deleteBooking = (id: string) => {
  return apiClient.delete(`/bookings/${id}`);
};

export const availableBookingSlots = (date: string, locationId: string) => {
  return apiClient.get(`/available-slots`, {
    params: { date, location_id: locationId }
  });
};
