import { defineStore } from 'pinia';
// import { createBooking, getUserBookings, deleteBooking } from '@/api/bookings';
import { getUserBookings } from '@/api/bookings';
import type { BookingState } from '@/models/booking'

export const useBookingStore = defineStore('booking', {
  state: (): BookingState => ({
    bookings: [],
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

    // async addBooking(data: { locationId: number; date: string }) {
    //   try {
    //     await createBooking(data);
    //     await this.fetchUserBookings(); // Обновляем список
    //   } catch (error) {
    //     console.error('Ошибка создания бронирования:', error);
    //   }
    // },

    // async removeBooking(id: number) {
    //   try {
    //     await deleteBooking(String(id));
    //     this.bookings = this.bookings.filter((booking) => booking.id !== id);
    //   } catch (error) {
    //     console.error('Ошибка удаления бронирования:', error);
    //   }
    // },
  },
});
