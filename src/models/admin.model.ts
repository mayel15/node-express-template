import { Role } from "../enums/role.enum";

export interface AdminModel {
  id: string;
  role?: Role;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
