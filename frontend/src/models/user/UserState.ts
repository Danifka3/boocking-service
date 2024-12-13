import type { User } from '@/models/user/User.ts'

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

