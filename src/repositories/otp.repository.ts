import { inject, injectable } from "tsyringe";
import { Context } from "../contexts/context";
import { OtpInputModel, OtpModel } from "../models/otp.model";

@injectable()
export class OtpRepository {
  constructor(@inject("Context") private ctx: Context) {}

  async createOtp(otp: OtpInputModel) {
    return this.ctx.prisma.otp.create({
      data: {
        email: otp.email,
        code: otp.code,
        expiresAt: otp.expiresAt,
      },
    });
  }

  async getOtpByEmail(email: string) {
    return this.ctx.prisma.otp.findUnique({
      where: {
        email: email,
      },
    });
  }

  async deleteOtpByEmail(email: string) {
    return this.ctx.prisma.otp.delete({
      where: {
        email: email,
      },
    });
  }

  async getOtpById(id: string) {
    return this.ctx.prisma.otp.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteOtpById(id: string) {
    return this.ctx.prisma.otp.delete({
      where: {
        id: id,
      },
    });
  }

  async updateOtp(email: string, otp: OtpModel) {
    return this.ctx.prisma.otp.update({
      where: {
        email: email,
      },
      data: {
        id: otp.id,
        email: otp.email,
        code: otp.code,
        expiresAt: otp.expiresAt,
      },
    });
  }

  async getAllOtps() {
    return this.ctx.prisma.otp.findMany();
  }

  async getExistingOtp(email: string, otpCode: string) {
    return this.ctx.prisma.otp.findUnique({
      where: {
        email: email,
        code: otpCode,
      },
    });
  }

  async deleteExpiredOtp() {
    return this.ctx.prisma.otp.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
