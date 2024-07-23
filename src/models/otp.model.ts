export interface OtpModel {
  id?: string;
  email: string;
  code: string;
  createdAt?: Date | undefined;
  expiresAt?: Date;
}

export interface OtpInputModel {
  email: string;
  code: string;
  expiresAt: Date;
}
