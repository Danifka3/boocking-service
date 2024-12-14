import type {User} from "./User.ts";

export interface UserRegistration extends Omit<User, 'role' | 'id'> {
  password: string
}

