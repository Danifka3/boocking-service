import type { Booking } from './Booking.ts';

export interface BookingUpdate extends Omit<Booking, 'created_at'> {
  id: string;
}
