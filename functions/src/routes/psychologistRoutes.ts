import express from "express";
import {createPsychologist, getAllPsychologists,
  getPsychologistById} from "../controllers/psychologistController";

// eslint-disable-next-line
const psychologistRouter = express.Router();

psychologistRouter.post("/", createPsychologist);

psychologistRouter.get("/", getAllPsychologists);

psychologistRouter.get("/:id", getPsychologistById);

export default psychologistRouter;
