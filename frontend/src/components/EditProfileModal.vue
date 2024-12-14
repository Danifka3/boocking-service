<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

interface Props {
  isVisible: boolean,
}

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);
const { updateUser } = userStore;

defineProps<Props>();
const emits = defineEmits(['close']);

const error = ref('')

const closeModal = () => {
  emits('close');
};

const updateProfile = async () => {
  if (currentUser.value?.name && currentUser.value?.email) {
    const response = await updateUser(currentUser.value)
    if (response) {
      closeModal();
      return
    }
    error.value = 'Произошла ошибка'
  } else {
    error.value = 'Заполните все поля'
  }
};
</script>

<template>
  <div v-if="isVisible && currentUser" class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <h2>Edit Profile</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </header>
      <div class="modal-body">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" type="text" v-model="currentUser.name" placeholder="Enter your name" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="currentUser.email" placeholder="Enter your email" />
        </div>
      </div>
      <footer class="modal-footer">
        <button class="update-button" @click="updateProfile">Update Profile</button>
        <span style="color: #c82333">{{error}}</span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #ffffff;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
}

.update-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.update-button:hover {
  background-color: #0056b3;
}
</style>
