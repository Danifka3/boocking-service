<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useLocationStore } from '@/stores/location.ts';
import type { Location } from '@/models/location';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user.ts';
import { useRouter } from 'vue-router';
import BookingModal from '@/components/BookingModal.vue';
import AddLocationModal from '@/components/AddLocationModal.vue'
import EditLocationModal from '@/components/EditLocationModal.vue'

const userStore = useUserStore();
const { currentUser, isAuthenticated } = storeToRefs(userStore);

const locationStore = useLocationStore();
const { getLocations, deleteLocation } = locationStore;
const { locations } = storeToRefs(locationStore);

const router = useRouter();

onMounted(async () => {
  await getLocations();
});

const searchQuery = ref('');
const showBookingModal = ref(false);
const showAddLocationModal = ref(false);
const showEditLocationModal = ref(false);
const currentLocation = ref({
  id: '',
  name: '',
  description: '',
  capacity: 0,
  price_per_booking: 0,
  created_at: '',
});

const filteredLocations = computed(() => {
  return locations.value?.filter((location: Location) =>
    location.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const bookLocation = (location: Location) => {
  if (!isAuthenticated.value) {
    router.push('/login');
    return;
  }

  currentLocation.value = location;
  showBookingModal.value = true;
};

const removeLocation = async (locationId: string) => {
  if (confirm('Are you sure you want to delete this location?')) await deleteLocation(locationId);
};

const editLocation = (location: Location) => {
  currentLocation.value = location;
  showEditLocationModal.value = true;
}
</script>

<template>
  <div class="locations-container">
    <h1>Locations</h1>

    <div class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name"
        class="search-input"
      />
    </div>

    <table class="locations-table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Capacity</th>
        <th>Price per Booking</th>
        <th>Actions</th>
        <th v-if="currentUser?.role === 'admin'">Admin Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="location in filteredLocations" :key="location.id">
        <td>{{ location.name }}</td>
        <td>{{ location.description }}</td>
        <td>{{ location.capacity }}</td>
        <td>{{ location.price_per_booking }}</td>
        <td>
          <button class="book-button" @click="bookLocation(location)">
            Book
          </button>
        </td>
        <td v-if="currentUser?.role === 'admin'">
          <div class="actions">
            <button
              v-if="currentUser?.role === 'admin'"
              class="edit-button"
              @click="editLocation(location)"
            >
              Edit
            </button>
            <button
              v-if="currentUser?.role === 'admin'"
              class="delete-button"
              @click="removeLocation(location.id)"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <button
      v-if="currentUser?.role === 'admin'"
      class="add-button"
      @click="showAddLocationModal = true"
    >
      Add Location
    </button>

    <BookingModal
      :is-visible="showBookingModal"
      :location="currentLocation"
      @close="showBookingModal = false"
    />

    <AddLocationModal
      :is-visible="showAddLocationModal"
      :location="currentLocation"
      @close="showAddLocationModal = false"
    />

    <EditLocationModal
      :is-visible="showEditLocationModal"
      :location="currentLocation"
      @close="showEditLocationModal = false"
    />
  </div>
</template>

<style scoped>
.locations-container {
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

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.search-input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.locations-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.locations-table th,
.locations-table td {
  padding: 0.75rem;
  border: 1px solid #dee2e6;
}

.locations-table th {
  background-color: #f8f9fa;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 10px;
}

.book-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.book-button:hover {
  background-color: #0056b3;
}

.delete-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 0.5rem;
}

.delete-button:hover {
  background-color: #c82333;
}

.add-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #218838;
}

.edit-button {
  padding: 0.5rem 1rem;
  background-color: #ffc107;
  color: #212529;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #e0a800;
}
</style>
