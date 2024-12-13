import type { Booking } from './Booking.ts'

export interface BookingState {
  bookings: Booking[] | null;
}

