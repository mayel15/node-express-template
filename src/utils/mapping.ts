import { AdminModel } from "../models/admin.model";

export const mapAdmin = (admin: any): AdminModel => ({
  id: admin.id,
  role: admin.role,
  firstName: admin.firstName,
  lastName: admin.lastName,
  email: admin.email,
  emailVerified: admin.emailVerified,
  phoneNumber: admin.phoneNumber ?? undefined,
  phoneNumberVerified: admin.phoneNumberVerified ?? undefined,
  password: admin.password,
  createdAt: admin.createdAt,
  updatedAt: admin.updatedAt,
});
