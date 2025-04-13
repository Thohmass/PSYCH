// server/src/routes/authRoutes.ts
import express from 'express';
import {createAdmin, createClient, createPsychologist, loginUser} from '../controllers/userAuthController';

const authRouter = express.Router();

authRouter.post('/register-admin', createAdmin);
authRouter.post('/register-client', createClient);
authRouter.post('/register-psychologist', createPsychologist);


authRouter.post('/login', loginUser);

export default authRouter;