// server_old/src/routes/authRoutes.ts
import express from "express";
import {
  createAdmin, createClient, createPsychologist, getUserData,
  loginUser, logoutUser,
} from "../controllers/userAuthController";
import {authenticateJWT} from "../middleware/authMiddleware";

// eslint-disable-next-line
const authRouter = express.Router();

authRouter.post("/register-admin", createAdmin);
authRouter.post("/register-client", createClient);
authRouter.post("/register-psychologist", createPsychologist);

authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

authRouter.get("/user-data", authenticateJWT, getUserData);

export default authRouter;
