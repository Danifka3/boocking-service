import type {User} from "./User.ts";

export interface UserLogin extends Omit<User, 'role' | 'name'> {
  password: string
}
