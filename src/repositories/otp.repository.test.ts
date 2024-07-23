import "reflect-metadata";
import { OtpRepository } from "./otp.repository";
import { Context, MockContext, createMockContext } from "../contexts/context";

describe("OtpRepository", () => {
  let otpRepository: OtpRepository;
  let mockCtx: MockContext;
  let ctx: Context;

  const otp = {
    id: "1",
    email: "you@are.dude",
    code: "123456",
    createdAt: new Date(),
    expiresAt: new Date(),
  };

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    otpRepository = new OtpRepository(ctx);
  });

  describe("createOtp", () => {
    it("should create a new otp", async () => {
      // Given
      mockCtx.prisma.otp.create.mockResolvedValue(otp);
      // When
      const result = await otpRepository.createOtp(otp);
      // Then
      expect(result).toEqual(otp);
    });
  });

  describe("getOtpByEmail", () => {
    it("should get an otp by email", async () => {
      // Given
      mockCtx.prisma.otp.findUnique.mockResolvedValue(otp);
      // When
      const result = await otpRepository.getOtpByEmail(otp.email);
      // Then
      expect(result).toEqual(otp);
    });
  });

  describe("deleteOtp", () => {
    it("should delete an otp", async () => {
      // Given
      mockCtx.prisma.otp.delete.mockResolvedValue(otp);
      // When
      const result = await otpRepository.deleteOtpById(otp.email);
      // Then
      expect(result).toEqual(otp);
    });
  });

  describe("getOtpById", () => {
    it("should get an otp by id", async () => {
      // Given
      mockCtx.prisma.otp.findUnique.mockResolvedValue(otp);
      // When
      const result = await otpRepository.getOtpById(otp.id);
      // Then
      expect(result).toEqual(otp);
    });
  });

  describe("deleteOtpById", () => {
    it("should delete an otp by id", async () => {
      // Given
      mockCtx.prisma.otp.delete.mockResolvedValue(otp);
      // When
      const result = await otpRepository.deleteOtpById(otp.id);
      // Then
      expect(result).toEqual(otp);
    });
  });

  describe("updateOtp", () => {
    it("should update an otp", async () => {
      // Given
      mockCtx.prisma.otp.update.mockResolvedValue(otp);
      // When
      const result = await otpRepository.updateOtp(otp.email, otp);
      // Then
      expect(result).toEqual(otp);
    });
  });

  describe("getAllOtps", () => {
    it("should get all otps", async () => {
      // Given
      mockCtx.prisma.otp.findMany.mockResolvedValue([otp]);
      // When
      const result = await otpRepository.getAllOtps();
      // Then
      expect(result).toEqual([otp]);
    });
  });

  describe("getExistingOtp", () => {
    it("should get an otp by email and otp", async () => {
      // Given
      mockCtx.prisma.otp.findUnique.mockResolvedValue(otp);
      // When
      const result = await otpRepository.getExistingOtp(otp.email, otp.code);
      // Then
      expect(result).toEqual(otp);
    });
  });

  describe("deleteExpiredOtp", () => {
    it("should delete expired otps", async () => {
      // Given
      //mockCtx.prisma.otp.deleteMany.mockResolvedValue(otp);
      // When
      const result = await otpRepository.deleteExpiredOtp();
      // Then
      expect(result).toEqual(undefined);
    });
  });
});
