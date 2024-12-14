<script setup lang="ts">
import { onMounted } from 'vue';
import { useBookingStore } from '@/stores/booking';
import { storeToRefs } from 'pinia'

const bookingStore = useBookingStore();
const { fetchUserBookings, removeBooking } = bookingStore;
const { bookings } = storeToRefs(bookingStore);

onMounted(async () => {
   await fetchUserBookings();
});

const handleCancel = async (bookingId: string) => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    await removeBooking(bookingId);
  }
};

const goToAddBooking = () => {
  window.location.href = '/'; // Перенаправление на домашнюю страницу
};
</script>

<template>
  <div class="bookings-container">
    <h1>Bookings</h1>
    <table class="bookings-table">
      <thead>
      <tr>
        <th>Location</th>
        <th>User</th>
        <th>Date & Time</th>
        <th>Status</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="booking in bookings" :key="booking.id">
        <td>{{ booking.location_id.name }}</td>
        <td>{{ booking.user_id.name }}</td>
        <td>{{ booking.date }} {{ booking.time }}</td>
        <td>{{ booking.status }}</td>
        <td>{{ booking.price }}</td>
        <td>
          <button class="edit-button">Edit</button>
          <button class="cancel-button" @click="handleCancel(booking.id)">Cancel</button>
        </td>
      </tr>
      </tbody>
    </table>

    <button class="add-button" @click="goToAddBooking">Add Booking</button>
  </div>
</template>

<style scoped>
.bookings-container {
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

.bookings-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.bookings-table th,
.bookings-table td {
  padding: 0.75rem;
  border: 1px solid #dee2e6;
}

.bookings-table th {
  background-color: #f8f9fa;
  font-weight: 700;
}

.edit-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #c82333;
}

.add-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #218838;
}
</style>
