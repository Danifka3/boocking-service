import type { Booking } from './Booking.ts';

export type BookingAdd = Omit<Booking, 'created_at'>
