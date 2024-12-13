import apiClient from './base.ts';
import type { LocationAdd } from '@/models/location'

// Получить все локации
export const getAllLocations = () => {
  return apiClient.get('/locations');
};

// Добавить новую локацию (только для админа)
export const addLocation = (data: LocationAdd) => {
  return apiClient.post('/locations', data);
};

// Обновить локацию (только для админа)
export const updateLocation = (id: string, data: LocationAdd ) => {
  return apiClient.put(`/locations/${id}`, data);
};

// Удалить локацию (только для админа, если необходимо)
export const deleteLocation = (id: string) => {
  return apiClient.delete(`/locations/${id}`);
};
