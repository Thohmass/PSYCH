// client/src/pages/SurveyPage.tsx
import React, { useState } from 'react';
import SurveyForm from '../components/SurveyForm';
import AdviceDisplay from '../components/AdviceDisplay';
import { SurveyAnswers } from '../components/SurveyForm'; // Import the SurveyAnswers type

interface GeneratedAdvice {
  title: string;
  text: string;
  recommendations: string[];
  tips?: string[];
}

const generateAdvice = (answers: SurveyAnswers): GeneratedAdvice => {
  console.log("Generujem odporúčanie na základe odpovedí:", answers);

  const impact = answers['q3_impact']; // Ako ťažkosti ovplyvňujú život
  const symptoms = answers['q4_symptoms'] as string[] || []; // Pole vybraných symptómov
  const duration = answers['q2_duration']; // Ako dlho ťažkosti trvajú

  let title = "Odporúčanie";
  let text = "Na základe vašich odpovedí vám odporúčame zvážiť nasledujúce kroky:";
  let recommendations: string[] = [];
  let tips: string[] = [];

  if (impact === 'significantly' || symptoms.includes('anxiety') || symptoms.includes('sadness')) {
    recommendations.push("Konzultácia s klinickým psychológom alebo psychiatrom.");
    if (duration === 'year_plus' || impact === 'significantly') {
      recommendations.push("Zvážte aj možnosť farmakoterapie v kombinácii s psychoterapiou (konzultujte s psychiatrom).");
    }
  } else if (impact === 'moderately' || symptoms.length > 0) {
    recommendations.push("Konzultácia s psychológom alebo psychoterapeutom.");
  } else {
    recommendations.push("Zvážte konzultáciu so školeným koučom alebo poradcom.");
    tips.push("Možno by pomohlo aj preskúmať techniky zvládania stresu alebo mindfulness.");
  }

  if (symptoms.includes('sleep_problems') && !recommendations.includes("Konzultácia s klinickým psychológom alebo psychiatrom.")) {
    recommendations.push("Zvážte konzultáciu so spánkovým špecialistom.");
  }

  if (symptoms.includes('anxiety')) {
    tips.push("Skúste relaxačné techniky ako hlboké dýchanie alebo meditáciu.");
  }
  if (symptoms.includes('sadness')) {
    tips.push("Skúste sa venovať aktivitám, ktoré vám v minulosti robili radosť, aj keď sa vám teraz nechce.");
  }

  if (recommendations.length === 0) {
    text = "Na základe vašich odpovedí nie je jasné, aký typ pomoci by bol najvhodnejší. Odporúčame začať konzultáciou s všeobecným lekárom, ktorý vás môže ďalej navigovať.";
    recommendations.push("Konzultácia s všeobecným lekárom.");
  }

  return { title, text, recommendations, tips };
};

const SurveyPage: React.FC = () => {
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  const [generatedAdvice, setGeneratedAdvice] = useState<GeneratedAdvice | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSurveySubmit = (answers: SurveyAnswers) => {
    setLoading(true);

    const advice = generateAdvice(answers);
    setGeneratedAdvice(advice);
    setIsSurveyCompleted(true); // Prepne na zobrazenie výsledkov
    setLoading(false);
  };

  const handleRestartSurvey = () => {
    setIsSurveyCompleted(false);
    setGeneratedAdvice(null);
  };


  return (
    <div>
      <h1>Dotazník pre zistenie potreby psychologickej pomoci</h1>

      {!isSurveyCompleted ? (
        <SurveyForm onSubmit={handleSurveySubmit} />
      ) : (
        <AdviceDisplay advice={generatedAdvice} onRestartSurvey={handleRestartSurvey} />
      )}

      {loading && <div>Generujem odporúčanie...</div>}
    </div>
  );
};

export default SurveyPage;