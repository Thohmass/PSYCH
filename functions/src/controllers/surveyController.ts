import {Request, Response} from "express";

interface SurveyAnswers {
  [questionId: string]: string | string[] | undefined;
}

interface GeneratedAdvice {
  title: string;
  text: string;
  recommendations: string[];
  tips?: string[];
}

const generateAdvice = (answers: SurveyAnswers): GeneratedAdvice => {
  console.log("Backend: Generujem odporúčanie na základe odpovedí:", answers);

  const impact = answers["q3_impact"];
  const symptoms = answers["q4_symptoms"] as string[] || [];
  const duration = answers["q2_duration"];

  /* eslint-disable */
  const title = "Odporúčanie pre psychologickú pomoc";
  let text = "Na základe vašich odpovedí vám odporúčame zvážiť nasledujúce formy pomoci:";
  const recommendations: string[] = [];
  const tips: string[] = [];

  // Príklad veľmi jednoduchej rozhodovacej logiky:
  // Táto logika by mala byť založená na odborných poznatkoch

  if (impact === "significantly" || symptoms.includes("anxiety") || symptoms.includes("sadness")) {
    recommendations.push("Konzultácia s klinickým psychológom alebo psychiatrom.");
    if (duration === "year_plus" || impact === "significantly") {
      recommendations.push("Zvážte aj možnosť farmakoterapie v kombinácii s psychoterapiou (konzultujte s psychiatrom).");
    }
  } else if (impact === "moderately" || symptoms.length > 0) {
    recommendations.push("Konzultácia s psychológom alebo psychoterapeutom.");
  } else {
    recommendations.push("Zvážte konzultáciu so školeným koučom alebo poradcom.");
    tips.push("Možno by pomohlo aj preskúmať techniky zvládania stresu alebo mindfulness.");
  }

  if (symptoms.includes("sleep_problems") && !recommendations.includes("Konzultácia s klinickým psychológom alebo psychiatrom.")) {
    recommendations.push("Zvážte konzultáciu so spánkovým špecialistom.");
  }

  if (symptoms.includes("anxiety")) {
    tips.push("Skúste relaxačné techniky ako hlboké dýchanie alebo meditáciu.");
  }
  if (symptoms.includes("sadness")) {
    tips.push("Skúste sa venovať aktivitám, ktoré vám v minulosti robili radosť, aj keď sa vám teraz nechce.");
  }

  // Ak nebolo možné na základe logiky dať konkrétne odporúčania:
  if (recommendations.length === 0) {
    text = "Na základe vašich odpovedí nie je možné určiť konkrétny typ pomoci. Odporúčame začať konzultáciou s všeobecným lekárom, ktorý vás môže ďalej navigovať.";
    recommendations.push("Konzultácia s všeobecným lekárom.");
  }
  /* eslint-enable */

  return {title, text, recommendations, tips};
};

export const submitSurvey = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({message: "The survey answers are missing."});
    return;
  }
  const answers: SurveyAnswers = req.body;

  try {
    const generatedAdvice = generateAdvice(answers);

    // const resultToSave = {
    //   userId: userId,
    //   timestamp: new Date().toISOString(), // Uložíme čas odoslania
    //   answers: answers, // Uložíme surové odpovede
    //   advice: generatedAdvice, // Uložíme vygenerované odporúčanie
    // };
    //
    // // Použijeme .push() na vygenerovanie unikátneho ID záznamu
    // const newResultRef = await surveyResultsRef.push(resultToSave);
    // const newResultId = newResultRef.key; // ID nového záznamu

    res.status(200).json(generatedAdvice);
  } catch (error: unknown) {
    console.error(
      "Chyba pri spracovaní alebo ukladaní dotazníka pre používateľa:", error
    );
    res.status(500).json({message: "Nepodarilo sa spracovať dotazník."});
  }
};
