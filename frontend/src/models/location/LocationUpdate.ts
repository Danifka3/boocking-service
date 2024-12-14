import type { Location } from './Location';

export type LocationUpdate = Omit<Location, 'created_at'>
