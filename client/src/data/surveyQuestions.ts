// client/src/data/surveyQuestions.ts

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select';
  options?: { value: string; label: string }[]; // Pre typy 'radio', 'checkbox', 'select'
  // Prípadne ďalšie vlastnosti ako 'required', 'placeholder', 'validation', atď.
}

// Pole definícií otázok dotazníka
export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'q1_feeling',
    text: 'Ako sa v poslednej dobe cítite?',
    type: 'textarea',
    // placeholder: 'Popíšte svoje pocity...'
  },
  {
    id: 'q2_duration',
    text: 'Ako dlho pociťujete tieto ťažkosti?',
    type: 'radio',
    options: [
      { value: 'weeks', label: 'Niekoľko týždňov' },
      { value: 'months', label: 'Niekoľko mesiacov' },
      { value: 'year_plus', label: 'Dlhšie ako rok' },
    ],
  },
  {
    id: 'q3_impact',
    text: 'Ako tieto ťažkosti ovplyvňujú váš každodenný život (práca, vzťahy, spánok...)?',
    type: 'select',
    options: [
      { value: 'not_much', label: 'Takmer vôbec' },
      { value: 'moderately', label: 'Mierne' },
      { value: 'significantly', label: 'Výrazne' },
    ],
  },
  {
    id: 'q4_symptoms',
    text: 'Trpíte niektorým z nasledujúcich príznakov?',
    type: 'checkbox',
    options: [
      { value: 'anxiety', label: 'Úzkosť / Panické záchvaty' },
      { value: 'sadness', label: 'Pretrvávajúci smútok / Beznádej' },
      { value: 'sleep_problems', label: 'Problémy so spánkom (nespavosť, prílišné spanie)' },
      { value: 'appetite_changes', label: 'Zmeny chuti do jedla / hmotnosti' },
      { value: 'concentration_issues', label: 'Problémy s koncentráciou / rozhodovaním' },
      { value: 'fatigue', label: 'Únava / nedostatok energie' },
      { value: 'social_withdrawal', label: 'Vyhýbanie sa spoločenským kontaktom' },
    ],
  },
  {
    id: 'q5_previous_help',
    text: 'Vyhľadali ste už niekedy psychologickú pomoc?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Áno' },
      { value: 'no', label: 'Nie' },
    ]
  }
  // Pridajte ďalšie relevantné otázky...
];