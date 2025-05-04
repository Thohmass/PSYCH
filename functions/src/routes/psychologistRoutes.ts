import express from "express";
import {
  createPsychologist, editPsychologist, getAllPsychologists,
  getPsychologistById
} from "../controllers/psychologistController";
import {authenticateJWT} from "../middleware/authMiddleware";

// eslint-disable-next-line
const psychologistRouter = express.Router();

psychologistRouter.post("/", createPsychologist);

psychologistRouter.get("/", getAllPsychologists);

psychologistRouter.get("/:id", getPsychologistById);

psychologistRouter.put("/:id", authenticateJWT, editPsychologist)

export default psychologistRouter;
