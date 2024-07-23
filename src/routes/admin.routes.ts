import "reflect-metadata";
import "../dependency-injection";
import { Router } from "express";
import AdminController from "../controllers/admin.controller";
import { container } from "tsyringe";
import { authenticateToken } from "../middlewares/auth.middleware";

/**
 * Note: You can use multer for uploading media like files, images, videos, etc.
 * For more information about it, visit: https://www.npmjs.com/package/multer
 */

// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: { fieldSize: 25 * 1024 * 1024 },
// });

// const adminController = new AdminController(
//   new AdminService(new AdminRepository(ctx))
// );

const adminController = container.resolve<AdminController>(AdminController);
const router = Router();

// GET

router.get("/all", (req, res) => {
  adminController.getAllAdmins().then((data) => res.json(data));
});

router.get("/:id", (req, res) => {
  adminController.getAdminById(req.params.id).then((data) => res.json(data));
});

// POST

router.post("/signup", (req, res) => {
  adminController.createAdmin(req.body).then((data) => res.json(data));
});

router.post("/login", (req, res) => {
  adminController.login(req.body).then((data) => res.json(data));
});

router.post("/email/otp/send", (req, res) => {
  adminController.sendOtp(req.body).then((data) => res.json(data));
});

router.post("/email/otp/verify", (req, res) => {
  adminController.verifyOtp(req.body).then((data) => res.json(data));
});

// PUT

router.put("/:id/full-name", (req, res) => {
  adminController
    .updateFullName(req.params.id, req.body)
    .then((data) => res.json(data));
});

router.put("/:id/phone-number", (req, res) => {
  adminController
    .updatePhoneNumber(req.params.id, req.body)
    .then((data) => res.json(data));
});

router.put("/:id/email", (req, res) => {
  adminController
    .updateEmail(req.params.id, req.body)
    .then((data) => res.json(data));
});

router.put("/:id/password", (req, res) => {
  adminController
    .updatePassword(req.params.id, req.body)
    .then((data) => res.json(data));
});

// DELETE

router.delete("/:id", (req, res) => {
  adminController.deleteAdmin(req.params.id).then((data) => res.json(data));
});

export default router;
