import { defineStore } from 'pinia';
import type { LocationState, LocationAdd, LocationUpdate } from '@/models/location'
import { getAllLocations, addLocation, updateLocation } from '@/api/locations.ts'

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
        console.error('Ошибка входа:', error);
      }
    },

    async addLocation(location: LocationAdd) {
      try {
        const response = await addLocation(location);
        console.log(response.data);
      } catch (error) {
        console.error('Ошибка входа:', error);
      }
    },

    async updateLocation(location: LocationUpdate) {
      try {
        const {id, ...data} = location;
        const response = await updateLocation(id, data);
        console.log(response.data);
      } catch (error) {
        console.error('Ошибка входа:', error);
      }
    },
  },
});
