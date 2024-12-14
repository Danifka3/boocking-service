import apiClient from './base.ts';
import type { UserLogin, UserRegistration } from '@/models/user'

export const registerUser = (data: UserRegistration) => {
  return apiClient.post('/users/register', data);
};

export const loginUser = (data: UserLogin) => {
  return apiClient.post('/users/login', data);
};

export const getCurrentUser = () => {
  return apiClient.get('/users/me');
};

export const updateUser = (data: {name: string, email: string}) => {
  return apiClient.patch(`/users/me`, data);
};

export const getAllUsers = () => {
  return apiClient.get('/users');
};

export const deleteUser = (id: string) => {
  return apiClient.delete(`/users/${id}`);
};
