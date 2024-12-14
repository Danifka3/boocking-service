import { defineStore } from 'pinia';
import type { LocationState, LocationAdd } from '@/models/location'
import { getAllLocations, addLocation, updateLocation, deleteLocation } from '@/api/locations.ts'

export const useLocationStore = defineStore('location', {
  state: (): LocationState => ({
    locations: null,
  }),
  actions: {
    async getLocations() {
      try {
        const response = await getAllLocations();
        this.locations = response.data;

      } catch (error) {
        console.error('Ошибка выполнения запроса:', error);
      }
    },

    async addLocation(location: LocationAdd) {
      try {
        const response = await addLocation(location);
        this.locations?.push(response.data.location);
        return true;
      } catch (error) {
        console.error('Ошибка выполнения запроса:', error);
        return false  ;
      }
    },

    async updateLocation(id: string, location: LocationAdd) {
      try {
        const response = await updateLocation(id, location);
        const index = this.locations?.findIndex((loc) => loc.id === id);
        if (index !== -1 && this.locations && (index || index === 0)) {
          this.locations[index] = { ...response.data.location };
        }
       return true;
      } catch (error) {
        console.error('Ошибка выполнения запроса:', error);
        return false;
      }
    },

    async deleteLocation(locationId: string) {
      try {
        await deleteLocation(locationId);

        if (this.locations) this.locations = this.locations.filter((location) => location.id !== locationId);
      } catch (error) {
        console.error('Ошибка выполнения запроса:', error);
      }
    },
  },
});
