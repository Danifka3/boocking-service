import { defineStore } from 'pinia';
import { loginUser, getCurrentUser, registerUser, getAllUsers, updateUser, deleteUser } from '@/api/users';
import type { UserState, User } from '@/models/user'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: null,
    currentUser: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await loginUser({ email, password });

        const { token } = response.data;
        localStorage.setItem('token', token);
        this.isAuthenticated = true;

        await this.fetchCurrentUser();
        return true
      } catch (error) {
        console.error('Ошибка входа:', error);
        return false
      }
    },

    async register(name: string, email: string, password: string) {
      try {
        const response = await registerUser({ name, email, password });

        const { token } = response.data;
        localStorage.setItem('token', token);
        this.isAuthenticated = true;

        await this.fetchCurrentUser();
        return true
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        return false
      }
    },

    async fetchCurrentUser() {
      try {
        const response = await getCurrentUser();
        this.currentUser = response.data;
        this.isAuthenticated = true;
      } catch (error) {
        this.logout()
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

    async updateUser(user: User) {
      try {
        const { name, email} = user
        const response = await updateUser({ name, email });
        this.users = response.data;

        return true
      } catch (error) {
        console.error('Ошибка выполнения запроса:', error);
        return false
      }
    },

    async getAllUsers() {
      try {
        const response = await getAllUsers();
        this.users = response.data;

      } catch (error) {
        console.error('Ошибка выполнения запроса:', error);
      }
    },

    async deleteUser(id: string) {
      try {
        await deleteUser(id);

        if (this.users) this.users = this.users.filter((user) => user.id !== id);
      } catch (error) {
        console.error('Ошибка выполнения запроса:', error);
      }
    },
  },
});
