import {Request, Response} from "express";
import {db} from "../config/firebaseConfig";

const feedbackCollection = db.collection("feedback");

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const {content} = req.body;

    if (!content) {
      res.status(400).json({
        message: "Aspoň niečo by ste tam mohli napísať," +
            " keď už idete posielať feedback...",
      });
      return;
    }

    const newFeedback = {
      content: content,
      timestamp: new Date().toISOString(),
    };

    await feedbackCollection.add(newFeedback);
    res.status(201).json({message: "Feedback úspešne odoslaný."});
  } catch (error: unknown) {
    console.error("Chyba pri spracovaní feedbacku:", error);
    if (error instanceof Error) {
      res.status(500).json({
        message: "Nepodarilo sa odoslať feedback.", error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Nepodarilo sa odoslať feedback.", error: "Neznáma chyba",
      });
    }
  }
};
