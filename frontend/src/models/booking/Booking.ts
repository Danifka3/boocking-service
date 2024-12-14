export interface Booking {
  date: string,
  time: string,
  status: string,
  price: number,
  created_at: string,
  location_id: {
    id: string,
    name: string,
  },
  user_id: {
    id: string,
    name: string,
  },
}
