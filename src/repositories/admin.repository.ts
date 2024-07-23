import { AdminModel } from "../models/admin.model";
import { mapAdmin } from "../utils/mapping";
import { Context } from "../contexts/context";
import { inject, injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import "reflect-metadata";
import { UserInputModel } from "../models/user-input.model";

@injectable()
export class AdminRepository {
  constructor(@inject("Context") private ctx: Context) {}

  async getAllAdmins() {
    const admins = await this.ctx.prisma.admin.findMany();
    return mapAdmin(admins);
  }

  async createAdmin(admin: UserInputModel) {
    return await this.ctx.prisma.admin.create({
      data: {
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        password: admin.password,
      },
    });
  }

  async deleteAdmin(id: string) {
    return await this.ctx.prisma.admin.delete({
      where: {
        id: id,
      },
    });
  }

  async getAdminById(id: string) {
    const admin = await this.ctx.prisma.admin.findUnique({
      where: {
        id: id,
      },
    });
    return mapAdmin(admin);
  }

  async getAdminByEmail(email: string) {
    const admin = await this.ctx.prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
    return mapAdmin(admin);
  }

  async getAdminByPhoneNumber(phoneNumber: string) {
    const admin = await this.ctx.prisma.admin.findUnique({
      where: {
        phoneNumber: phoneNumber,
      },
    });
    return mapAdmin(admin);
  }

  async getAdminByPhoneNumberOrEmail(emailOrPhoneNumber: string) {
    const admin = await this.ctx.prisma.admin.findUnique({
      where: {
        email: emailOrPhoneNumber,
        phoneNumber: emailOrPhoneNumber,
      },
    });
    return mapAdmin(admin);
  }

  async updateEmail(id: string, email: string) {
    return await this.ctx.prisma.admin.update({
      where: {
        id: id,
      },
      data: {
        email: email,
        emailVerified: false,
      },
    });
  }

  async updateEmailVerified(id: string, emailVerified: boolean) {
    return await this.ctx.prisma.admin.update({
      where: {
        id: id,
      },
      data: {
        emailVerified: emailVerified,
      },
    });
  }

  async updatePhoneNumber(id: string, phoneNumber: string) {
    return await this.ctx.prisma.admin.update({
      where: {
        id: id,
      },
      data: {
        phoneNumber: phoneNumber,
        phoneNumberVerified: false,
      },
    });
  }

  async updatePhoneNumberVerified(id: string, phoneNumberVerified: boolean) {
    return await this.ctx.prisma.admin.update({
      where: {
        id: id,
      },
      data: {
        phoneNumberVerified: phoneNumberVerified,
      },
    });
  }

  async updatePassword(id: string, password: string) {
    return await this.ctx.prisma.admin.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });
  }

  async updateFullName(
    id: string,
    fullName: {
      firstName: string;
      lastName: string;
    }
  ) {
    return await this.ctx.prisma.admin.update({
      where: {
        id: id,
      },
      data: {
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      },
    });
  }
}
