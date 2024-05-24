// src/users/user.ontroller.ts
import { Request, Response } from 'express';
import { Route, Get, Post } from 'tsoa';

@Route("api/users")
export default class UserController {
  @Get("/")
  public async getAllUsers() { 
    return { message: 'Get all users' };
  };
  
}

