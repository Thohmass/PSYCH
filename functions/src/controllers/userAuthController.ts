import {Request, Response} from "express";
import {db} from "../config/firebaseConfig";
import {UserRole, User} from "../types";
import {comparePasswords, hashPassword} from "../utils/passwordUtils";
import * as jwt from "jsonwebtoken";
import {secret} from "../config/secret.json";
import {AuthenticatedRequest} from "../middleware/authMiddleware";

const userCollection = db.collection("users");
const psychologistCollection = db.collection("psychologists");

// const jwtSecret = process.env.JWT_SECRET as string;
const jwtSecret = secret;

if (!jwtSecret) {
  console.error("FATAL ERROR: JWT secret is not defined.");
  // process.exit(1);
}

export const createAdmin =
  async (req: Request, res: Response):Promise<void> => {
    try {
      const userParams = req.body;

      if (!userParams.email || !userParams.password) {
        res.status(400).send("Emailová adresa a heslo sú povinné.");
        return;
      }

      const snapshot = await userCollection
        .where("email", "==", userParams.email)
        .limit(1)
        .get();
      if (!snapshot.empty) {
        res.status(409).send("Pre danú emailovú adresu už bol vytvorený účet.");
        return;
      }

      userParams.password = await hashPassword(userParams.password);
      userParams.role = UserRole.Admin;
      userParams.registrationDate = Date.now();

      const docRef = await userCollection.add(userParams);
      res.status(201).send(`Administrátorský účet bol úspešne vytvorený s ID: ${
        docRef.id
      }`);
    } catch (error: unknown) {
      console.error("Chyba pri registrácii administrátora:", error);
      res.status(500).send("Nepodarilo sa zaregistrovať administrátora.");
    }
  };

export const createClient = async (req: Request, res: Response) => {
  try {
    const userParams = req.body;

    if (!userParams.email || !userParams.password) {
      res.status(400).json({message: "Používateľské meno a heslo sú povinné."});
      return;
    }

    const snapshot = await userCollection
      .where("email", "==", userParams.email)
      .limit(1)
      .get();
    if (!snapshot.empty) {
      res.status(409).json({
        message: "Pre danú emailovú adresu už je vytvorený používateľský účet.",
      });
      return;
    }

    const hashedPassword = await hashPassword(userParams.password);

    await userCollection.add({
      password: hashedPassword,
      role: UserRole.Client,
      registrationDate: Date.now(),
      email: userParams.email,
    });

    res.status(201).json({message: "Účet klienta úspešne vytvorený."});
  } catch (error: unknown) {
    console.error("Chyba pri registrácii klienta:", error);
    res.status(500).json({message: "Nepodarilo sa vytvoriť účet klienta."});
  }
};

export const createPsychologist = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const {
      email,
      password,
      name,
      lastName,
      description,
      experience,
      languages,
      priceRange,
      address,
      contactInfo,
      photoURL,
      onlineTherapyOption,
      specializations,
      therapyTypes,
      locations,
    } = req.body;

    if (!email || !password || !name || !lastName) {
      res.status(400).json({
        message: "Email, heslo, meno a priezvisko sú povinné.",
      });
      return;
    }

    const snapshot = await userCollection
      .where("email", "==", email)
      .limit(1)
      .get();
    if (!snapshot.empty) {
      res.status(409).json({
        message: "Pre tento email už existuje vytvorený účet.",
      });
      return;
    }

    const hashedPassword = await hashPassword(password);

    await userCollection.add({
      email,
      hashedPassword,
      role: UserRole.Psychologist,
      timeStamp: Date.now(),
    });

    await psychologistCollection.add({
      role: UserRole.Psychologist,
      name,
      lastName,
      description,
      // Qualification,
      experience,
      languages: languages || [],
      priceRange,
      address,
      contactInfo,
      photoURL: photoURL || null,
      onlineTherapyOption: onlineTherapyOption || false,
      specializations: specializations || [],
      therapyTypes: therapyTypes || [],
      locations: locations || [],
    });

    res.status(201).json({message: "Účet psychológa úspešne vytvorený."});
  } catch (error: unknown) {
    console.error("Chyba pri registrácii psychológa:", error);
    res.status(500).json({message: "Nepodarilo sa vytvoriť účet psychológa."});
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      res.status(400).json({message: "Emailová adresa a heslo sú povinné."});
      return;
    }

    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    const doc = snapshot.docs.at(0);
    if (!doc) {
      res.status(404).json({
        message: "Používateľ so zadanou emailovou adresou nebol nájdený.",
      });
      return;
    }

    const data = doc.data() as User;
    const isPasswordValid =
      await comparePasswords(password, data.hashedPassword);

    if (isPasswordValid) {
      const payload = {
        userId: doc.id,
        role: data.role,
      };
      const token = jwt.sign(payload, jwtSecret, {expiresIn: "1h"});

      const oneHourInMillis = 60 * 60 * 1000;
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: oneHourInMillis,
        path: "/",
      });

      console.log(doc.id);
      console.log(data.role as UserRole);
      res.status(200).json({
        message: "Úspešne prihlásený.",
        token: token,
        role: data.role as UserRole,
        userId: doc.id,
      });
      return;
    } else {
      res.status(401).json({message: "Nesprávna mailová adresa alebo heslo."});
      return;
    }
  } catch (error: unknown) {
    console.error("Chyba pri prihlasovaní:", error);
    res.status(500).json({message: "Nepodarilo sa prihlásiť."});
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.cookie("authToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    res.status(200).json({message: "Úspešne odhlásený."});
  } catch (error: unknown) {
    console.error("Chyba pri odhlasovaní:", error);
    res.status(500).json({message: "Nepodarilo sa odhlásiť."});
  }
};

export const getUserData = async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log(req.user);
    console.log(req.user?.userId);
    console.log(req.user?.role);
    console.log("Pokus o ziskanie udajov pouzivatela");
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    if (!userId || !userRole) {
      res.status(401).json({message: "Používateľ nie je autentifikovaný."});
      return;
    }

    const userRef = await userCollection.doc(userId).get();
    if (!userRef.exists) {
      res.status(404).send("Používateľ nebol nájdený");
      return;
    }
    // eslint-disable-next-line
    const {hashedPassword, ...allData} = userRef.data() as User;
    res.status(200).json({
      userId: userRef.id,
      ...allData,
    });
  } catch (error) {
    console.error("Chyba pri získavaní údajov používateľa:", error);
    res.status(500).send("Chyba pri získavaní dát používateľa.");
  }
};
