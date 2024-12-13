import apiClient from './base.ts';
import type { UserLogin, UserRegistration } from '@/models/user'

// Регистрация нового пользователя
export const registerUser = (data: UserRegistration) => {
  return apiClient.post('/users/register', data);
};

// Вход пользователя
export const loginUser = (data: UserLogin) => {
  return apiClient.post('/users/login', data);
};

// Получение текущего пользователя
export const getCurrentUser = () => {
  return apiClient.get('/users/me');
};
