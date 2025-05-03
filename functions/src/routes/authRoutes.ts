// server_old/src/routes/authRoutes.ts
import express from "express";
import {createAdmin, createClient, createPsychologist,
  loginUser, logoutUser} from "../controllers/userAuthController";

// eslint-disable-next-line
const authRouter = express.Router();

authRouter.post("/register-admin", createAdmin);
authRouter.post("/register-client", createClient);
authRouter.post("/register-psychologist", createPsychologist);

authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
