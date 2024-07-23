import { inject, injectable } from "tsyringe";
import { AdminRepository } from "../repositories/admin.repository";
import { UserInputModel } from "../models/user-input.model";
import { BlobService } from "./blob.service";
@injectable()
export class AdminService {
  constructor(
    @inject(AdminRepository) private adminRepository: AdminRepository,
    @inject(BlobService) private blobService: BlobService
  ) {}

  async getAllAdmins() {
    return await this.adminRepository.getAllAdmins();
  }

  async createAdmin(admin: UserInputModel) {
    return await this.adminRepository.createAdmin(admin);
  }

  async deleteAdmin(id: string) {
    return await this.adminRepository.deleteAdmin(id);
  }

  // async updateAdmin(id: string, admin: any) {
  //   return await this.adminRepository.updateAdmin(id, admin);
  // }

  async updateEmail(id: string, email: string) {
    return await this.adminRepository.updateEmail(id, email);
  }

  async updateEmailVerified(id: string, emailVerified: boolean) {
    return await this.adminRepository.updateEmailVerified(id, emailVerified);
  }

  async updatePhoneNumber(id: string, phoneNumber: string) {
    return await this.adminRepository.updatePhoneNumber(id, phoneNumber);
  }

  async updatePhoneNumberVerified(id: string, phoneNumberVerified: boolean) {
    return await this.adminRepository.updatePhoneNumberVerified(
      id,
      phoneNumberVerified
    );
  }

  async updatePassword(id: string, password: string) {
    return await this.adminRepository.updatePassword(id, password);
  }

  async updateFullName(
    id: string,
    fullName: {
      firstName: string;
      lastName: string;
    }
  ) {
    return await this.adminRepository.updateFullName(id, fullName);
  }

  async getAdminById(id: string) {
    return await this.adminRepository.getAdminById(id);
  }

  async getAdminByEmail(email: string) {
    return await this.adminRepository.getAdminByEmail(email);
  }

  async getAdminByPhoneNumber(phoneNumber: string) {
    return await this.adminRepository.getAdminByPhoneNumber(phoneNumber);
  }

  async getAdminByPhoneNumberOrEmail(emailOrPhoneNumber: string) {
    return await this.adminRepository.getAdminByPhoneNumberOrEmail(
      emailOrPhoneNumber
    );
  }
}
