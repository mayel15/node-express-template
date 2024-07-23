// src/users/user.ontroller.ts
import { PrismaClient } from "@prisma/client";

import {
  Route,
  Get,
  Post,
  Controller,
  Body,
  Path,
  Delete,
  Put,
  SuccessResponse,
} from "tsoa";
import jwt from "jsonwebtoken";
import { AdminService } from "../services/admin.service";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import { autoInjectable, inject, injectable } from "tsyringe";
import { OtpService } from "../services/otp.service";
import { AuthService } from "../services/auth.service";
import { UserInputModel } from "../models/user-input.model";
import { ACCESS_TOKEN_EXPIRATION_TIME_WEB } from "../utils/constants";

@Route("api/admin")
@injectable()
export default class AdminController {
  constructor(
    @inject(AdminService) private adminService: AdminService,
    @inject(AuthService) private authService: AuthService,
    @inject(OtpService) private otpService: OtpService
  ) {}

  // GET

  @Get("/all")
  public async getAllAdmins() {
    try {
      const admins = await this.adminService.getAllAdmins();
      return admins;
    } catch (error) {
      throw new Error("Admin not found");
    }
  }

  @Get("{id}")
  public async getAdminById(@Path() id: string) {
    const admin = await this.adminService.getAdminById(id);
    return admin;
  }

  // POST

  @SuccessResponse(201, "The user is created")
  @Post("/login")
  public async login(@Body() body: { email: string; password: string }) {
    const admin = await this.adminService.getAdminByEmail(body.email);

    if (!admin) {
      return "Invalid phone number";
    }

    const passwordMatch = await bcrypt.compare(body.password, admin?.password);

    if (!passwordMatch) {
      return "Invalid password";
    }

    const token = this.authService.generateToken(
      admin,
      ACCESS_TOKEN_EXPIRATION_TIME_WEB
    );

    return {
      message: `The user ${admin?.firstName} is logged successfully`,
      token: token,
      ...admin,
    };
  }

  @Post("/signup")
  public async createAdmin(
    @Body()
    body: UserInputModel
  ) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const admin = await this.adminService.createAdmin({
      ...body,
      password: hashedPassword,
    });

    const adminFrom = await this.adminService.getAdminById(admin.id);

    const token = this.authService.generateToken(
      admin,
      ACCESS_TOKEN_EXPIRATION_TIME_WEB
    );
    return {
      message: "The user is created successfully",
      token: token,
      ...adminFrom,
    };
  }

  @Post("/email/otp/send")
  public async sendOtp(@Body() body: { email: string }) {
    const otpSent = await this.otpService.sendEmailOTP(body.email);
    if (otpSent) {
      return Promise.resolve({
        message: "OTP sent successfully",
      });
    }

    return Promise.resolve({
      message: "OTP",
    });
  }

  @Post("/email/otp/verify")
  public async verifyOtp(@Body() body: { email: string; otp: string }) {
    const existingOtp = await this.otpService.getExistingOtp(
      body.email,
      body.otp
    );

    if (!existingOtp) {
      return {
        message: "Invalid OTP",
      };
    }
    if (existingOtp.expiresAt < new Date()) {
      await this.otpService.deleteOtpById(existingOtp.id);
      return {
        message: "OTP verified successfully",
      };
    }

    const adminConcerned = await this.adminService.getAdminByEmail(
      existingOtp.email
    );

    await this.adminService.updateEmailVerified(adminConcerned.id, true);

    await this.otpService.deleteOtpById(existingOtp.id);

    return {
      message: "OTP verified successfully",
    };
  }

  @Put("/{id}/password")
  public async updatePassword(
    @Path() id: string,
    @Body() body: { password: string }
  ) {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      return await this.adminService.updatePassword(id, hashedPassword);
    } catch (error) {
      throw new Error("Admin not found");
    }
  }

  @Put("/{id}/email")
  public async updateEmail(
    @Path() id: string,
    @Body() body: { email: string }
  ) {
    try {
      return await this.adminService.updateEmail(id, body.email);
    } catch (error) {
      throw new Error("Admin not found");
    }
  }

  @Put("/{id}/phone-number")
  public async updatePhoneNumber(
    @Path() id: string,
    @Body() body: { phoneNumber: string }
  ) {
    try {
      return await this.adminService.updatePhoneNumber(id, body.phoneNumber);
    } catch (error) {
      throw new Error("Admin not found");
    }
  }

  @Put("/{id}/full-name")
  public async updateFullName(
    @Path() id: string,
    @Body() body: { firstName: string; lastName: string }
  ) {
    try {
      return await this.adminService.updateFullName(id, body);
    } catch (error) {
      throw new Error("Admin not found");
    }
  }

  // DELETE

  @Delete("{id}")
  public async deleteAdmin(@Path() id: string) {
    try {
      await this.adminService.deleteAdmin(id);
    } catch (error) {
      throw new Error("Admin not found");
    }
  }
}
