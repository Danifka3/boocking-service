import type { Location } from './Location';

export type LocationAdd = Omit<Location, 'created_at' | 'id'>
