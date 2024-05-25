// src/users/user.ontroller.ts
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Route, Get, Post } from "tsoa";

@Route("api/users")
export default class UserController {
  prisma = new PrismaClient();

  @Get("/")
  public async getAllUsers() {
    return { message: "All the users are here dude" };
  }

  @Post("/")
  public async createUser() {
    /*
    await this.prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@prisma.io",
      },
    });
    */
    return { message: "Hum hum, you wonna create a user dude?" };
  }
}
