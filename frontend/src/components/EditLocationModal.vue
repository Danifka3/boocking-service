<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Location } from '@/models/location'
import {useLocationStore} from '@/stores/location'

const locationStore = useLocationStore();
const { updateLocation } = locationStore

interface Props {
  isVisible: boolean,
  location: Location,
}

const props = defineProps<Props>();
const emits = defineEmits(['close', 'update']);

const id = ref(props.location.id)

const location = ref({
  name: props.location.name,
  description: props.location.description,
  capacity: props.location.capacity,
  price_per_booking: props.location.price_per_booking,
});

watch(
  () => props.location,
  (newLocation) => {
    if (newLocation) {
      id.value = newLocation.id;
      location.value.name = newLocation.name;
      location.value.description = newLocation.description;
      location.value.capacity = newLocation.capacity;
      location.value.price_per_booking = newLocation.price_per_booking;
    }
  },
  { immediate: true }
);

const closeModal = () => {
  emits('close');
};

const error = ref('')

const updateLocationHandler = async () => {
  if (location.value.name && location.value.description && location.value.capacity > 0 && location.value.price_per_booking > 0) {
    const response = await updateLocation(props.location.id, location.value)
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
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <h2>Edit Location</h2>
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
        <button class="update-button" @click="updateLocationHandler">Update Location</button>
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

.update-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.update-button:hover {
  background-color: #218838;
}
</style>
