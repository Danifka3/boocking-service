import type { User } from '@/models/user/User.ts'

export interface UserState {
  users: User[] | null;
  currentUser: User | null;
  isAuthenticated: boolean;
}

