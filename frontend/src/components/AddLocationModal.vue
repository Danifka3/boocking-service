<script setup lang="ts">
import { ref } from 'vue';
import {useLocationStore} from '@/stores/location'

const locationStore = useLocationStore();
const { addLocation } = locationStore

interface AddLocalModalProps {
  isVisible: boolean
}

defineProps<AddLocalModalProps>();
const emits = defineEmits(['close']);

const location = ref({
  name: '',
  description: '',
  capacity: 0,
  price_per_booking: 0,
});

const error = ref('')

const closeModal = () => {
  location.value = {
    name: '',
    description: '',
    capacity: 0,
    price_per_booking: 0,
  }
  emits('close');
};

const addLocationHandler = async () => {
  if (location.value.name && location.value.description && location.value.capacity > 0 && location.value.price_per_booking > 0) {
    const response = await addLocation(location.value)
    if (response) {
      closeModal();
      return
    }
    error.value = 'An error occurred'
  } else {
    error.value = 'Fill all fields'
  }
};
</script>

<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <h2>Add Location</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </header>
      <div class="modal-body">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" type="text" v-model="location.name" placeholder="Enter location name" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="location.description" placeholder="Enter description"></textarea>
        </div>
        <div class="form-group">
          <label for="capacity">Capacity</label>
          <input id="capacity" type="number" v-model="location.capacity" placeholder="Enter capacity" />
        </div>
        <div class="form-group">
          <label for="price">Price per Booking</label>
          <input id="price" type="number" v-model="location.price_per_booking" placeholder="Enter price per booking" />
        </div>
      </div>
      <footer class="modal-footer">
        <button class="add-button" @click="addLocationHandler">Add Location</button>
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

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
}

textarea {
  resize: none;
  height: 80px;
}

.add-button {
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

.add-button:hover {
  background-color: #0056b3;
}
</style>
