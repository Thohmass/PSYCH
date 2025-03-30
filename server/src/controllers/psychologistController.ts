import { Request, Response } from 'express';
import { db } from '../config/firebaseConfig';
import { Psychologist } from "../../../shared/PsychologistInterfaces";

// Referencia na kolekciu 'psychologists' v Firestore
const psychologistsCollection = db.collection('psychologists');

// Funkcia pre vytvorenie nového psychológa
export const createPsychologist = async (req: Request, res: Response) => {
    try {
        const psychologistData = req.body;
        // TODO: Pridať validáciu dát pred uložením

        const docRef = await psychologistsCollection.add(psychologistData);
        res.status(201).send(`Psychológ bol úspešne vytvorený s ID: ${docRef.id}`);
    } catch (error) {
        console.error('Chyba pri vytváraní psychológa:', error);
        res.status(500).send('Chyba pri vytváraní psychológa');
    }
};

// Funkcia pre získanie všetkých psychológov
export const getAllPsychologists = async (req: Request, res: Response) => {
    try {
        const snapshot = await psychologistsCollection.get();
        const psychologists: Psychologist[] = [];
        snapshot.forEach(doc => {
            const data = doc.data() as Omit<Psychologist, 'id'>; // Pretypujeme doc.data() na Psychologist bez 'id'
            psychologists.push({
                id: doc.id,
                ...data,
            });
        });
        res.status(200).json(psychologists);
    } catch (error) {
        console.error('Chyba pri získavaní všetkých psychológov:', error);
        res.status(500).send('Chyba pri získavaní psychológov');
    }
};

// Funkcia pre získanie konkrétneho psychológa podľa ID
export const getPsychologistById = async (req: Request, res: Response) => {
    try {
        const psychologistId = req.params.id;
        const doc = await psychologistsCollection.doc(psychologistId).get();

        if (!doc.exists) {
            res.status(404).send('Psychológ s daným ID nebol nájdený');
            return;
        }

        res.status(200).json({
            id: doc.id,
            ...doc.data(),
        });
    } catch (error) {
        console.error('Chyba pri získavaní psychológa podľa ID:', error);
        res.status(500).send('Chyba pri získavaní psychológa');
    }
};