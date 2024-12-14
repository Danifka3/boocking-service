<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia'

const userStore = useUserStore();
const { getAllUsers, deleteUser } = userStore;
const { users } = storeToRefs(userStore);

onMounted(async () => {
  await getAllUsers();
});

const removeUser = async (userId: string) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await deleteUser(userId);
  }
};
</script>

<template>
  <div class="users-container">
    <h1>Users</h1>
    <table class="users-table">
      <thead>
      <tr>
        <th>Role</th>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.role }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <button class="delete-button" @click="removeUser(user.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.users-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 1rem;
  font-family: 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.users-table th,
.users-table td {
  padding: 0.75rem;
  border: 1px solid #dee2e6;
}

.users-table th {
  background-color: #f8f9fa;
  font-weight: 700;
}

.delete-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
