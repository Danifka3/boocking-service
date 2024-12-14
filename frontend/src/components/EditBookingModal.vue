<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Booking } from '@/models/booking'
import { useBookingStore } from '@/stores/booking.ts'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'

const bookingStore = useBookingStore();
const {availableBookingSlots, updateBooking, fetchUserBookings, getAllUserBookings} = bookingStore
const {timeSlots} = storeToRefs(bookingStore)

const usersStore = useUserStore();
const { currentUser } = storeToRefs(usersStore);

interface EditBookingModalProps {
  isVisible: boolean,
  booking: Booking,
}

const props = defineProps<EditBookingModalProps>();
const emits = defineEmits(['close', 'update']);

const userName = ref('');
const locationName = ref('');
const locationId = ref('');
const bookingDate = ref('');
const bookingTime = ref('');
const status = ref('');
const price = ref(0);

watch(
  () => props.booking,
  (newBooking) => {
    if (newBooking) {
      userName.value = newBooking.user_id.name;
      locationName.value = newBooking.location_id.name;
      locationId.value = newBooking.location_id.id;
      bookingDate.value = newBooking.date;
      bookingTime.value = newBooking.time;
      status.value = newBooking.status;
      price.value = newBooking.price;
    }
  },
  { immediate: true }
);

const closeModal = () => {
  userName.value = '';
  locationName.value = '';
  locationId.value = '';
  bookingDate.value = '';
  bookingTime.value = '';
  status.value = '';
  price.value = 0;
  emits('close');
};

const updateBookingHandler = async () => {
  if (bookingDate.value && bookingTime.value && status.value ) {
    const response = await updateBooking(props.booking.id, bookingDate.value, bookingTime.value, status.value)
    if (response) {
      if (currentUser.value?.role === 'admin') {
        await getAllUserBookings();
      } else if (currentUser.value?.role === 'user') {
        await fetchUserBookings();
      }
      closeModal();
    }

  }
};

watch(
  [bookingDate, locationId],
  async ([newDate, newLocation]) => {
    if (newDate && newLocation) {
      try {
        await availableBookingSlots(newDate, newLocation);
      } catch (error) {
        console.error('Error fetching available slots:', error);
      }
    }
  },
  { immediate: true } // Вызываем сразу при монтировании
);
</script>

<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <h2>Edit Booking</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </header>
      <div class="modal-body">
        <div class="form-group">
          <label for="location">User</label>
          <span>{{ userName }}</span>
        </div>
        <div class="form-group">
          <label for="user">Location</label>
          <span>{{ locationName }}</span>
        </div>
        <div class="form-group">
          <label for="date">Date</label>
          <input id="date" type="date" v-model="bookingDate" />
        </div>
        <div class="form-group">
          <label for="time">Time</label>
          <button
            v-for="time in timeSlots"
            :key="time"
            class="time-button"
            @click="bookingTime = time"
            :class="{ selected: bookingTime === time }"
          >
            {{ time }}
          </button>
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="status">
            <option value="confirmed">Confirmed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>
      <footer class="modal-footer">
        <button class="update-button" @click="updateBookingHandler">Update Booking</button>
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
select {
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
