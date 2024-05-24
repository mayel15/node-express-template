// src/users/user.routes.ts
import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userController = new UserController();

const router = Router();

router.get("/", async (req, res) => {
    const controller = new UserController();
    const response = await controller.getAllUsers();
    return res.send(response);
});

export default router;
