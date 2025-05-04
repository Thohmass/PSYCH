import {Request, Response} from "express";
import {db} from "../config/firebaseConfig";
import {Psychologist} from "../types";
import {AuthenticatedRequest} from "../middleware/authMiddleware";
import psychologistSchema from "../types/psychologistSchema.json"

const psychologistsCollection = db.collection("psychologists");

export const createPsychologist = async (req: Request, res: Response) => {
  try {
    const psychologistData = req.body;
    // TODO: Pridať validáciu dát pred uložením

    const docRef = await psychologistsCollection.add(psychologistData);
    res.status(201).send(`Psychológ bol úspešne vytvorený s ID: ${docRef.id}`);
  } catch (error) {
    console.error("Chyba pri vytváraní psychológa:", error);
    res.status(500).send("Chyba pri vytváraní psychológa");
  }
};

export const getAllPsychologists = async (req: Request, res: Response) => {
  try {
    const snapshot = await psychologistsCollection.get();
    const psychologists: Psychologist[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Omit<Psychologist, "id">;
      psychologists.push({
        id: doc.id,
        ...data,
      });
    });
    res.status(200).json(psychologists);
  } catch (error) {
    console.error("Chyba pri získavaní všetkých psychológov:", error);
    res.status(500).send("Chyba pri získavaní psychológov");
  }
};

export const getPsychologistById = async (req: Request, res: Response) => {
  try {
    const psychologistId = req.params.id;
    const doc = await psychologistsCollection.doc(psychologistId).get();

    if (!doc.exists) {
      res.status(404).send("Psychológ s daným ID nebol nájdený");
      return;
    }

    res.status(200).json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error("Chyba pri získavaní psychológa podľa ID:", error);
    res.status(500).send("Chyba pri získavaní psychológa");
  }
};

export const editPsychologist =
  async (req: AuthenticatedRequest, res: Response) => {

  const userId = req.user?.userId;
  const psychologistId = req.params.id;
  const userRole = req.user?.role;
  const updatedProfileData = req.body;

  if (!userId || !userRole) {
    res.status(401).json({ message: 'Používateľ nie je autentifikovaný.' });
    return;
  }

  const allowedUpdatesFromSchema = Object.keys(psychologistSchema.properties);
  const disallowedFields = ['userId'];
  const allowedUpdates = allowedUpdatesFromSchema.filter(field =>
    !disallowedFields.includes(field)
  ) as (keyof Psychologist)[];
  // const allowedUpdates = allowedUpdatesFromSchema as (keyof Psychologist)[];

  const updates: any = {}; // TODO: Lepšie typovanie
  Object.keys(updatedProfileData).forEach((field: string | number) => {
    if (allowedUpdates.includes(field as keyof Psychologist)) {
      updates[field] = updatedProfileData[field];
    } else {
      console.warn(
        `${req.user?.userId} sa pokúsil aktualizovať nepovolené pole (${field})`
      );
    }
    if (updatedProfileData.hasOwnProperty(field)) {
      updates[field] = updatedProfileData[field];
    }
  })

  try {
    const targetPsychologistSnapshot =
      await psychologistsCollection.doc(psychologistId).get();
    const targetPsychologist = targetPsychologistSnapshot.data();

    if (!targetPsychologist) {
      res.status(404).json({
        message: `Psycholog s ID ${psychologistId} nenádený.`
      });
      return;
    }
    if (targetPsychologist.userId !== userId) {
      res.status(409).json({
        message: `Profil psychologa s ID ${psychologistId} nepatri
         pouzivatelovi ${userId}.`
      })
    }

    await psychologistsCollection.doc(psychologistId).update(
      {
        ...updates,
      }
    )

    res.status(200).json({
      message: `Profil psychológa ${psychologistId} úspešne aktualizovaný.`
    });
  } catch (error: any) {
    console.error(
      `Chyba pri aktualizácii profilu psychológa ${psychologistId}:`, error);
    res.status(500).json({
      message: 'Nepodarilo sa aktualizovať profil psychológa.'
    });
  }
}
