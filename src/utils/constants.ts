import dotenv from "dotenv";
dotenv.config();

// for bot mail for sending OTP
export const BOT_MAIL_ADDRESS = process.env.BOT_MAIL_ADDRESS;
export const BOT_MAIL_PASSWORD = process.env.BOT_MAIL_PASSWORD;

// auth
export const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;
export const REFRESH_SECRET_TOKEN = process.env.REFRESH_SECRET_TOKEN;

// token expirition time
export const ACCESS_TOKEN_EXPIRATION_TIME_WEB = "1h";
export const ACCESS_TOKEN_EXPIRATION_TIME_MOBILE = "1y";

// for Twilio
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
export const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID;

// for Paytech
export const PAYTECH_API_KEY = process.env.PAYTECH_API_KEY;
export const PAYTECH_API_SECRET = process.env.PAYTECH_API_SECRET;
