import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import {RoleType} from "../types";
import {secret} from "../config/secret.json";

// const jwtSecret = process.env.JWT_SECRET;
const jwtSecret = secret;

if (!jwtSecret) {
  console.error("FATAL ERROR: JWT secret is not defined in functions config.");
}

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: RoleType;
  };
}

export const authenticateJWT = (req: AuthenticatedRequest,
  res: Response, next: NextFunction) => {
  const token = req.cookies.authToken;

  if (token == null) {
    console.error("Verification failed: missing authorisation token in header");
    res.sendStatus(401);
    return;
  }

  // eslint-disable-next-line
  jwt.verify(token, jwtSecret!, (err: unknown, user: any) => {
    if (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        console.error("JWT verification failed:", err.message);
      } else {
        console.error("JWT verification failed:", err);
      }
      res.sendStatus(403);
      return;
    }

    req.user = {
      userId: user.userId,
      role: user.role as RoleType,
    };

    next();
  });
};
