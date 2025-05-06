import express from "express";
import {submitSurvey} from "../controllers/surveyController";

// eslint-disable-next-line
const surveyRouter = express.Router();

surveyRouter.post("/submit", submitSurvey);

export default surveyRouter;
