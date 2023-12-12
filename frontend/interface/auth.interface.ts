import { User } from "./user.interface";

export interface Auth {
  isAuthenticated: boolean;
  jwt: string;
  user?: User;
}
