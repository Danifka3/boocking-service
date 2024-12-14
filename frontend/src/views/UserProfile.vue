<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import EditProfileModal from '@/components/EditProfileModal.vue'

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);
const showEditModal = ref(false);

const openEditProfile = () => {
  showEditModal.value = true;
};
</script>

<template>
  <div
    v-if="currentUser"
    class="profile-container"
  >
    <h1>My Profile</h1>
    <div class="profile-field">
      <label>Role:</label>
      <span>{{ currentUser.role }}</span>
    </div>
    <div class="profile-field">
      <label>Name:</label>
      <span>{{ currentUser.name }}</span>
    </div>
    <div class="profile-field">
      <label>Email:</label>
      <span>{{ currentUser.email }}</span>
    </div>
    <button class="edit-button" @click="openEditProfile">Edit Profile</button>
  </div>

  <EditProfileModal
    :is-visible="showEditModal"
    :user="currentUser"
    @close="showEditModal = false"
   />
</template>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 2rem;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-family: 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.profile-field {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
}

label {
  font-weight: 700;
  color: #212529;
}

span {
  color: #495057;
}

.edit-button {
  display: block;
  margin: 1rem auto 0;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #0056b3;
}
</style>
