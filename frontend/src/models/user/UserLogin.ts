import type {User} from "./User.ts";

export interface UserLogin extends Omit<User, 'role' | 'name' | 'id'> {
  password: string
}
