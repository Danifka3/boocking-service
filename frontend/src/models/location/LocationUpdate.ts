import { Location } from './Location';

export interface LocationUpdate extends Omit<Location, 'created_at'> {
  id: string;
}
