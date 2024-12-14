<script setup lang="ts">
import { ref } from 'vue';
import type { Location } from '@/models/location'

interface BookingModalProps {
  isVisible: boolean,
  location: Location,
}

defineProps<BookingModalProps>();
const emits = defineEmits(['close', 'book']);

const bookingDate = ref('');
const selectedTime = ref('');

const closeModal = () => {
  emits('close');
};

const handleBooking = () => {
  if (selectedTime.value) {
    console.log()
    closeModal();
  }
};
</script>

<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <h2>{{ location.name }}</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </header>
      <div class="modal-body">
        <p>{{ location.description }}</p>
        <br>

        <div class="form-group">
          <label for="booking-date">Booking Date</label>
          <input type="date" id="booking-date" :value="bookingDate" readonly />
        </div>
        <div class="time-options">
          <p>Select Time:</p>
          <button
            v-for="time in ['10:00', '12:00', '14:00', '16:00']"
            :key="time"
            class="time-button"
            @click="selectedTime = time"
            :class="{ selected: selectedTime === time }"
          >
            {{ time }}
          </button>
        </div>
      </div>
      <footer class="modal-footer">
        <button class="book-button" :disabled="!selectedTime" @click="handleBooking">
          Book
        </button>
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
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
}

.time-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.time-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.time-button.selected {
  background-color: #007bff;
  color: #ffffff;
  border-color: #007bff;
}

.book-button {
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

.book-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.book-button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
