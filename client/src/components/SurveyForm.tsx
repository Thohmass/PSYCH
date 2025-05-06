// client/src/components/SurveyForm.tsx
import React, { useState } from 'react';
import { surveyQuestions, SurveyQuestion } from '../data/surveyQuestions'; // Import otázok

export interface SurveyAnswers {
  [questionId: string]: string | string[] | undefined; // Kľúč je ID otázky, hodnota je odpoveď (string pre text, pole stringov pre checkbox)
}

interface SurveyFormProps {
  onSubmit: (answers: SurveyAnswers) => void; // Callback funkcia pri odoslaní formulára
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = surveyQuestions[currentQuestionIndex];

  // Handler pre zmenu odpovede
  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
    // Prípadne tu môžeš pridať aj validáciu odpovede
    setError(null); // Vyčistíme chybu pri zmene odpovede
  };

  // Handler pre checkbox (špecifické, lebo odpoveď je pole)
  const handleCheckboxChange = (questionId: string, optionValue: string, isChecked: boolean) => {
    const currentAnswers = (answers[questionId] || []) as string[];
    if (isChecked) {
      // Pridáme možnosť do poľa, ak je zaškrtnutá
      setAnswers({
        ...answers,
        [questionId]: [...currentAnswers, optionValue],
      });
    } else {
      // Odstránime možnosť z poľa, ak je odškrtnutá
      setAnswers({
        ...answers,
        [questionId]: currentAnswers.filter(answer => answer !== optionValue),
      });
    }
    setError(null); // Vyčistíme chybu pri zmene odpovede
  };


  // Prechod na ďalšiu otázku
  const handleNext = () => {
    // TODO: Pridať validáciu, či bola na aktuálnu otázku poskytnutá odpoveď, ak je povinná
    // if (isQuestionRequired(currentQuestion) && !hasAnswer(currentQuestion.id, answers)) {
    //     setError('Prosím, odpovedzte na otázku.');
    //     return;
    // }
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setError(null); // Vyčistíme chybu pri prechode na ďalšiu otázku
    }
  };

  // Prechod na predchádzajúcu otázku
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setError(null); // Vyčistíme chybu pri prechode na predchádzajúcu otázku
    }
  };

  // Odoslanie formulára (volá callback onSubmit)
  const handleSubmit = () => {
    // TODO: Pridať validáciu všetkých odpovedí pred odoslaním, ak sú povinné
    // if (!allQuestionsAnswered(surveyQuestions, answers)) {
    //     setError('Prosím, odpovedzte na všetky povinné otázky.');
    //     return;
    // }
    onSubmit(answers); // Odovzdáme všetky zozbierané odpovede rodičovskému komponentu
  };


  // Pomocná funkcia na renderovanie rôznych typov vstupov
  const renderInput = (question: SurveyQuestion) => {
    const answerValue = answers[question.id]; // Získame aktuálnu odpoveď pre túto otázku

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={(answerValue as string) || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            // placeholder={question.placeholder}
          />
        );
      case 'textarea':
        return (
          <textarea
            value={(answerValue as string) || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            // placeholder={question.placeholder}
          />
        );
      case 'radio':
        return (
          <div>
            {question.options?.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={question.id} // Názov skupiny pre radio buttons
                  value={option.value}
                  checked={answerValue === option.value}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        // Odpoveď pre checkbox je pole stringov
        const checkboxAnswers = (answerValue || []) as string[];
        return (
          <div>
            {question.options?.map((option) => (
              <label key={option.value}>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={checkboxAnswers.includes(option.value)} // Kontrolujeme, či je hodnota v poli odpovedí
                  onChange={(e) => handleCheckboxChange(question.id, option.value, e.target.checked)}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      case 'select':
        return (
          <select
            value={(answerValue as string) || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          >
            <option value="">Prosím vyberte...</option> {/* Prázdna defaultná možnosť */}
            {question.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return <p>Neznámy typ otázky.</p>;
    }
  };

  if (!currentQuestion) {
    // Toto by sa nemalo stať, ak je surveyQuestions naplnené
    return <div>Dotazník je prázdny.</div>;
  }


  return (
    <div>
      <h3>Otázka {currentQuestionIndex + 1} z {surveyQuestions.length}</h3>
      <p>{currentQuestion.text}</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="survey-question-input">
        {renderInput(currentQuestion)}
      </div>

      <div className="survey-navigation">
        {currentQuestionIndex > 0 && (
          <button onClick={handlePrevious}>Predchádzajúca</button>
        )}
        {currentQuestionIndex < surveyQuestions.length - 1 ? (
          <button onClick={handleNext}>Ďalšia</button>
        ) : (
          // Zobraziť tlačidlo Odoslať na poslednej otázke
          <button onClick={handleSubmit}>Odoslať Dotazník</button>
        )}
      </div>

      <div className="survey-progress">
          Priebeh: {((currentQuestionIndex) / surveyQuestions.length) * 100}%
      </div>

    </div>
  );
};

export default SurveyForm;