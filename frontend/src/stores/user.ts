import { defineStore } from 'pinia';
import { loginUser, getCurrentUser, registerUser } from '@/api/users';
import type { UserState } from '@/models/user'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    currentUser: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await loginUser({ email, password });
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        this.currentUser = user;
        this.isAuthenticated = true;
        return true
      } catch (error) {
        console.error('Ошибка входа:', error);
        return false
      }
    },

    async register(name: string, email: string, password: string) {
      try {
        const response = await registerUser({ name, email, password });
        const { token, message } = response.data;

        console.log(message);
        localStorage.setItem('token', token);
        this.isAuthenticated = true;
        return true
      } catch (error) {
        console.error('Ошибка входа:', error);
        return false
      }
    },

    async fetchCurrentUser() {
      try {
        const response = await getCurrentUser();
        this.currentUser = response.data;
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Ошибка получения текущего пользователя:', error);
      }
    },

    logout() {
      localStorage.removeItem('token');
      this.currentUser = null;
      this.isAuthenticated = false;
    },

    restoreSession() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isAuthenticated = true;
      }
    },
  },
});
