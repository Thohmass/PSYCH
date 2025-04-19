// server/src/controllers/userAuthController.ts
import {Request, Response} from 'express';
import { db } from '../config/firebaseConfig';
import { UserRole } from '@myproject/shared';
import {comparePasswords, hashPassword} from '../utils/passwordUtils';

const userCollection = db.collection('users');
const psychologistCollection = db.collection('psychologists');

export const createAdmin = async (req: Request, res: Response):Promise<void> => {
    try {
        const userParams = req.body;

        if (!userParams.email || !userParams.password) {
            res.status(400).send('Emailová adresa a heslo sú povinné.');
            return;
        }

        const snapshot = await userCollection
            .where('email', '==', userParams.email)
            .limit(1)
            .get();
        if (!snapshot.empty) {
            res.status(409).send('Pre danú emailovú adresu už bol vytvorený používateľský účet.');
            return;
        }

        userParams.password = await hashPassword(userParams.password);

        const docRef = await userCollection.add(userParams);
        res.status(201).send(`Administrátorský účet bol úspešne vytvorený s ID: ${docRef.id}`);
    } catch (error: any) {
        console.error('Chyba pri registrácii administrátora:', error);
        res.status(500).send('Nepodarilo sa zaregistrovať administrátora.');
    }
};

export const createClient = async (req: Request, res: Response) => {
    try {
        const userParams = req.body;

        if (!userParams.email || !userParams.password) {
            res.status(400).json({ message: 'Používateľské meno a heslo sú povinné.' });
            return;
        }

        const snapshot = await userCollection
            .where('email', '==', userParams.email)
            .limit(1)
            .get();
        if (!snapshot.empty) {
            res.status(409).json({ message: 'Pre danú emailovú adresu už bol vytvorený používateľský účet.' });
            return;
        }

        const hashedPassword = await hashPassword(userParams.password);

        await userCollection.add({
            password: hashedPassword,
            role: UserRole.Client,
            // Prípadné uloženie ďalších informácií o psychológovi
        });

        res.status(201).json({ message: 'Účet psychológa úspešne vytvorený.' });
    } catch (error: any) {
        console.error('Chyba pri registrácii psychológa:', error);
        res.status(500).json({ message: 'Nepodarilo sa vytvoriť účet psychológa.' });
    }
};

export const createPsychologist = async (req: Request, res: Response) => {
    try {
        const {
            Email,
            Password,
            Name,
            LastName,
            Description,
            Qualification,
            Experience,
            Languages,
            PriceRange,
            Address,
            ContactInfo,
            PhotoURL,
            OnlineTherapyOption,
            Specializations,
            TherapyTypes,
            Locations,
        } = req.body;

        if (!Email || !Password || !Name || !LastName) {
            res.status(400).json({ message: 'Email, heslo, meno a priezvisko sú povinné.' });
            return;
        }

        const snapshot = await userCollection
            .where('Email', '==', Email)
            .limit(1)
            .get();
        if (!snapshot.empty) {
            res.status(409).json({ message: 'Pre tento email už existuje vytvorený účet.' });
            return;
        }

        const hashedPassword = await hashPassword(Password);

        await userCollection.add({
            Email,
            hashedPassword,
            Role: UserRole.Psychologist,
            TimeStamp: Date.now(),
        })

        await psychologistCollection.add({
            Role: UserRole.Psychologist,
            Name,
            LastName,
            Description,
            // Qualification,
            Experience,
            Languages: Languages || [],
            PriceRange,
            Address,
            ContactInfo,
            PhotoURL: PhotoURL || null,
            OnlineTherapyOption: OnlineTherapyOption || false,
            Specializations: Specializations || [],
            TherapyTypes: TherapyTypes || [],
            Locations: Locations || [],
        });

        res.status(201).json({ message: 'Účet psychológa úspešne vytvorený.' });
    } catch (error: any) {
        console.error('Chyba pri registrácii psychológa:', error);
        res.status(500).json({ message: 'Nepodarilo sa vytvoriť účet psychológa.' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Emailová adresa a heslo sú povinné.' });
            return;
        }

        const snapshot = await db
            .collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();

        const doc = snapshot.docs.at(0)
        if (!doc) {
            res.status(404).json({ message: 'Používateľ so zadanou emailovou adresou nebol nájdený.' });
            return;
        }

        const data = doc.data();
        const isPasswordValid = await comparePasswords(password, data.password);

        if (isPasswordValid) {
            res.status(200).json({ message: 'Úspešne prihlásený.', role: data.role as UserRole});
            return;
        } else {
            res.status(401).json({ message: 'Nesprávna mailová adresa alebo heslo.' });
            return;
        }
    } catch (error: any) {
        console.error('Chyba pri prihlasovaní:', error);
        res.status(500).json({ message: 'Nepodarilo sa prihlásiť.' });
    }
}