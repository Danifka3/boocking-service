<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useBookingStore } from '@/stores/booking';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia'
import type { Booking } from '@/models/booking'
import EditBookingModal from '@/components/EditBookingModal.vue'
import { useLocationStore } from '@/stores/location.ts'

const bookingStore = useBookingStore();
const { getAllUserBookings, fetchUserBookings, removeBooking } = bookingStore;
const { bookings } = storeToRefs(bookingStore);

const usersStore = useUserStore();
const { getAllUsers } = usersStore;
const { users, currentUser } = storeToRefs(usersStore);

const locationStore = useLocationStore();
const { getLocations } = locationStore;
const { locations } = storeToRefs(locationStore);

const locationFilter = ref('');
const dateFilter = ref('');
const timeFilter = ref('');
const statusFilter = ref('');
const userFilter = ref('');

const showEditBookingModal = ref(false);
const currentBooking = ref();


onMounted(async () => {
  if (currentUser.value?.role === 'admin') {
    await getAllUserBookings();
  } else if (currentUser.value?.role === 'user') {
    await fetchUserBookings();
  }

  if (currentUser.value?.role === 'admin') await getAllUsers();
  await getLocations();
});

const filteredBookings = computed(() => {
  return bookings.value?.filter((booking) => {
    const matchesLocation = locationFilter.value
      ? booking.location_id.name.toLowerCase().includes(locationFilter.value.toLowerCase())
      : true;
    const matchesDate = dateFilter.value ? booking.date === dateFilter.value : true;
    const matchesTime = timeFilter.value ? booking.time === timeFilter.value : true;
    const matchesStatus = statusFilter.value ? booking.status === statusFilter.value : true;
    const matchesUser = userFilter.value ? booking.user_id.name === userFilter.value : true;

    return matchesLocation && matchesDate && matchesTime && matchesStatus && matchesUser;
  });
});

const handleCancel = async (bookingId: string) => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    await removeBooking(bookingId);
    if (currentUser.value?.role === 'admin') {
      await getAllUserBookings();
    } else if (currentUser.value?.role === 'user') {
      await fetchUserBookings();
    }
  }
};

const goToAddBooking = () => {
  window.location.href = '/'; // Перенаправление на домашнюю страницу
};

const editBooking = (booking: Booking) => {
  currentBooking.value = booking;
  showEditBookingModal.value = true;
}
</script>

<template>
  <div class="bookings-container">
    <h1>Bookings</h1>

    <div class="filters">
      <input
        v-model="locationFilter"
        type="text"
        placeholder="Filter by location"
        class="filter-input"
      />
      <input
        v-model="dateFilter"
        type="date"
        placeholder="Filter by date"
        class="filter-input"
      />
      <input
        v-model="timeFilter"
        type="time"
        placeholder="Filter by time"
        class="filter-input"
      />
      <select v-model="statusFilter" class="filter-select">
        <option value="">All statuses</option>
        <option value="confirmed">Confirmed</option>
        <option value="canceled">Canceled</option>
      </select>
      <select v-if="currentUser?.role === 'admin'" v-model="userFilter" class="filter-select">
        <option value="">All users</option>
        <option v-for="user in users" :key="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>

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
      <tr v-for="booking in filteredBookings" :key="booking.id">
        <td>{{ booking.location_id.name }}</td>
        <td>{{ booking.user_id.name }}</td>
        <td>{{ booking.date }} {{ booking.time }}</td>
        <td>{{ booking.status }}</td>
        <td>{{ booking.price }}</td>
        <td>
          <button
            class="edit-button"
            @click="editBooking(booking)"
          >
            Edit
          </button>
          <button class="cancel-button" @click="handleCancel(booking.id)">Cancel</button>
        </td>
      </tr>
      </tbody>
    </table>

    <button class="add-button" @click="goToAddBooking">Add Booking</button>

    <EditBookingModal
      v-if="locations"
      :is-visible="showEditBookingModal"
      :booking="currentBooking"
      @close="showEditBookingModal = false"
    />
  </div>
</template>

<style scoped>
.bookings-container {
  max-width: 1000px;
  margin: 50px auto;
  padding: 1rem;
  font-family: 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-input,
.filter-select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
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
