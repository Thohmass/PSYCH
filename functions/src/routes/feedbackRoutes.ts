import express from "express";
import {createFeedback} from "../controllers/feedbackController";

// eslint-disable-next-line
const feedbackRouter = express.Router();

feedbackRouter.post("/", createFeedback);

export default feedbackRouter;
