import { defineStore } from 'pinia';
import { getUserBookings, availableBookingSlots, createBooking, deleteBooking, getAllBookings } from '@/api/bookings';
import type { BookingState } from '@/models/booking'

export const useBookingStore = defineStore('booking', {
  state: (): BookingState => ({
    bookings: [],
    timeSlots: [],
  }),
  actions: {
    async fetchUserBookings() {
      try {
        const response = await getUserBookings();
        this.bookings = response.data;
      } catch (error) {
        console.error('Ошибка получения бронирований:', error);
      }
    },

    async getAllUserBookings() {
      try {
        const response = await getAllBookings();
        this.bookings = response.data;
      } catch (error) {
        console.error('Ошибка получения бронирований:', error);
      }
    },

    async addBooking(location_id: string, date: string, time: string ) {
      try {
        await createBooking({location_id, date, time});
        await this.fetchUserBookings(); // Обновляем список
        return true
      } catch (error) {
        console.error('Ошибка создания бронирования:', error);
        return false
      }
    },

    async removeBooking(id: string) {
      try {
        await deleteBooking(String(id));
        // this.bookings = this.bookings.filter((booking) => booking.id !== id);
      } catch (error) {
        console.error('Ошибка удаления бронирования:', error);
      }
    },

    async availableBookingSlots(date: string, locationId: string) {
      try {
        const response = await availableBookingSlots(date, locationId);
        this.timeSlots = response.data.availableSlots;
      } catch (error) {
        console.error('Ошибка удаления бронирования:', error);
      }
    },
  },
});
