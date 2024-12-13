<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useUserStore } from './stores/user.ts';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);
const router = useRouter();

const handleLoginClick = () => {
  router.push('/login');
};

const handleLogoutClick = () => {
  userStore.logout(); // Вызываем метод logout из userStore
  router.push('/'); // Возвращаем на главную страницу после выхода
};
</script>

<template>
  <header class="navbar">
    <div class="container">
      <RouterLink to="/"><img alt="App logo" class="logo" src="@/assets/logo.svg" width="80" height="80" /></RouterLink>
      <nav>
        <RouterLink to="/locations" class="nav-link">Locations</RouterLink>
        <RouterLink to="/users" class="nav-link">Users</RouterLink>
        <RouterLink to="/bookings" class="nav-link">Bookings</RouterLink>
        <button v-if="!isAuthenticated" @click="handleLoginClick" class="auth-button">Login</button>
        <div class="nav-link-container" v-else>
          <RouterLink to="/profile" class="nav-link">My Profile</RouterLink>
          <button @click="handleLogoutClick" class="auth-button secondary">Logout</button>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

.container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
}

.logo {
  height: 50px;
}

nav {
  display: flex;
  gap: 1rem;
  font-family: 'Roboto', sans-serif;
}

.nav-link {
  color: #212529;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link-container {
  display: flex;
  align-items: center;
}

.auth-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-button.secondary {
  background-color: #6c757d;
}

.auth-button.secondary:hover {
  background-color: #565e64;
}

.auth-button:hover {
  background-color: #0056b3;
}

.nav-link:hover {
  background-color: #007bff;
  color: #ffffff;
}

.nav-link.router-link-exact-active {
  background-color: #007bff;
  color: #ffffff;
}

main {
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
}
</style>

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
