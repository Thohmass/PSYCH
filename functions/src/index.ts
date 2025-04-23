import * as functions from "firebase-functions";
import express, {Express} from "express";
import psychologistRoutes from "./routes/psychologistRoutes";
import authRoutes from "./routes/authRoutes";
import forumRoutes from "./routes/forumRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";

const app: Express = express();

app.use(express.json());

app.use("/api/psychologists", psychologistRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/feedback", feedbackRoutes);
//
// app.get('/', (req: Request, res: Response) => {
//     res.send('HladamPsychologa.sk API beží!');
// });

export const api = functions.https.onRequest(app);
