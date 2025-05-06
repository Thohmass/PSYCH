import express, {Express} from "express";
import psychologistRoutes from "./routes/psychologistRoutes";
import authRoutes from "./routes/authRoutes";
import forumRoutes from "./routes/forumRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import cookieParser from "cookie-parser";
import {onRequest} from "firebase-functions/v2/https";
import surveyRoutes from "./routes/surveyRoutes";
// import {defineSecret} from "firebase-functions/params";
// import {secret} from "./config/secret.json";

// const jwtSecret = defineSecret("JWT_SECRET");
// const jwtSecret = secret;

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/psychologists", psychologistRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/survey", surveyRoutes);

export const api = onRequest(
  {
    // secrets: [jwtSecret],
    region: "europe-central2",
  },
  app
);
