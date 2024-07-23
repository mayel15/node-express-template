import { inject, injectable } from "tsyringe";
import { OtpRepository } from "../repositories/otp.repository";
import { OtpInputModel } from "../models/otp.model";
import { EmailService } from "./email.service";
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID,
} from "../utils/constants";
const randomstring = require("randomstring");

@injectable()
export class OtpService {
  // Download the helper library from https://www.twilio.com/docs/node/install
  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure

  client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  constructor(
    @inject(OtpRepository) private otpRepository: OtpRepository,
    @inject(EmailService) private emailService: EmailService
  ) {}

  async createOtp(otp: OtpInputModel) {
    return this.otpRepository.createOtp(otp);
  }

  async getOtpByEmail(email: string) {
    return this.otpRepository.getOtpByEmail(email);
  }

  async deleteOtpByEmail(email: string) {
    return this.otpRepository.deleteOtpByEmail(email);
  }

  async getOtpById(id: string) {
    return this.otpRepository.getOtpById(id);
  }

  async deleteOtpById(id: string) {
    return this.otpRepository.deleteOtpById(id);
  }

  async updateOtp(email: string, otp: OtpInputModel) {
    return this.otpRepository.updateOtp(email, otp);
  }

  async getAllOtps() {
    return this.otpRepository.getAllOtps();
  }

  async getExistingOtp(email: string, otp: string) {
    return this.otpRepository.getExistingOtp(email, otp);
  }

  async deleteExpiredOtp() {
    return this.otpRepository.deleteExpiredOtp();
  }

  private generateOTP() {
    return randomstring.generate({ length: 6, charset: "numeric" });
  }

  sendEmailOTP(email: string): boolean {
    const otp = {
      email: email,
      code: this.generateOTP(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    };
    this.otpRepository.createOtp(otp);
    const subject = "OTP Verification Code";
    const message = `<html> <body> <h1> Your verification code is: ${otp.code}</h1> </body> </html>`;
    const otpSent = this.emailService.sendEmail(email, subject, message);
    return otpSent;
  }

  sendPhoneNumberOTP(phoneNumber: string) {
    this.client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({ to: phoneNumber, channel: "sms" })
      .then((verification) => console.log(verification.sid));
  }

  async verifyPhoneNumberOTP(phoneNumber: string, code: string) {
    return this.client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phoneNumber, code: code })
      .then((verification_check) => console.log(verification_check.status));
  }
}
