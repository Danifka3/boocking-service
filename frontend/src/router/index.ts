import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/UserProfile.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersPage.vue'),
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: () => import('../views/BookingsPage.vue'),
    },
  ],
})

export default router
