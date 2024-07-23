import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  jwt.verify(token, ACCESS_SECRET_TOKEN, (err: any, user: any) => {
    if (err) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    //req.body = {...req.body, user};
    next();
  });
};
