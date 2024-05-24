// src/users/user.ontroller.ts
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Route, Get, Post } from "tsoa";

@Route("api/users")
export default class UserController {
  prisma = new PrismaClient();

  @Get("/")
  public async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  @Post("/")
  public async createUser() {
    await this.prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@prisma.io",
      },
    });
  }
}
