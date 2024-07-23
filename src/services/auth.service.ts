import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class AuthService {
  ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;
  REFRESH_SECRET_TOKEN = process.env.REFRESH_SECRET_TOKEN;

  constructor() {}

  generateToken = (user: any, expiresIn: string): string => {
    const token = jwt.sign(
      // {
      //   id: user.id,
      //   email: user.email,
      // },
      user,
      this.ACCESS_SECRET_TOKEN, // Replace with your own secret key
      { expiresIn: expiresIn } // Token expiration time
    );
    return token;
  };

  generateRefreshToken = (user: any, expiresIn: string) => {
    return jwt.sign(user, this.REFRESH_SECRET_TOKEN, { expiresIn: expiresIn });
  };
}
