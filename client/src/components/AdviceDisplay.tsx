// client/src/components/AdviceDisplay.tsx
import React from 'react';

interface AdviceDisplayProps {
  advice: {
    title: string;
    text: string;
    recommendations: string[]; // E.g., types of help or specialists
    tips?: string[]; // Optional tips
  } | null; // Advice can be null initially

  onRestartSurvey: () => void; // Optional: Allow restarting the survey
}

const AdviceDisplay: React.FC<AdviceDisplayProps> = ({ advice, onRestartSurvey }) => {
  if (!advice) {
    return <div>Generujem odporúčanie...</div>; // Or some loading/default state
  }

  return (
    <div>
      <h2>{advice.title}</h2>
    <p>{advice.text}</p>

    <h3>Odporúčané formy pomoci / Špecialisti:</h3>
  {advice.recommendations.length > 0 ? (
    <ul>
      {advice.recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
    </ul>
  ) : (
    <p>Na základe vašich odpovedí nebolo možné určiť konkrétne odporúčania. Odporúčame konzultovať s všeobecným lekárom.</p>
  )}

  {advice.tips && advice.tips.length > 0 && (
    <>
      <h3>Tipy:</h3>
  <ul>
  {advice.tips.map((tip, index) => (
      <li key={index}>{tip}</li>
    ))}
  </ul>
  </>
  )}

  {onRestartSurvey && (
    <button onClick={onRestartSurvey}>Spustiť dotazník znova</button>
  )}
  </div>
);
};

export default AdviceDisplay;