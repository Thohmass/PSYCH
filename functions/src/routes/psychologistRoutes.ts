import express from "express";
import {createPsychologist, getAllPsychologists,
  getPsychologistById} from "../controllers/psychologistController";

// eslint-disable-next-line
const psychologistRouter = express.Router();

// Endpoint pre vytvorenie nového psychológa
psychologistRouter.post("/", createPsychologist);

// Endpoint pre získanie zoznamu všetkých psychológov
psychologistRouter.get("/", getAllPsychologists);

// Endpoint pre získanie konkrétneho psychológa podľa ID
psychologistRouter.get("/:id", getPsychologistById);

export default psychologistRouter;
