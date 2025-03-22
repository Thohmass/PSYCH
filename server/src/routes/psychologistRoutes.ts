import express from 'express';
import { createPsychologist, getAllPsychologists, getPsychologistById } from '../controllers/psychologistController';

const router = express.Router();

// Endpoint pre vytvorenie nového psychológa
router.post('/psychologists', createPsychologist);

// Endpoint pre získanie zoznamu všetkých psychológov
router.get('/psychologists', getAllPsychologists);

// Endpoint pre získanie konkrétneho psychológa podľa ID
router.get('/psychologists/:id', getPsychologistById);

export default router;