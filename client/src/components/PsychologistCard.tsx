import React from 'react';

export interface Psychologist {
    PsychologistID: string;
    Name: string;
    LastName: string;
    Description: string;
    Qualification: string;
    Experience: string;
    Languages: string;
    PriceRange: string;
    Address: string;
    Contact: {
        phone: string;
        email: string;
    };
    PhotoURL?: string;
    OnlineTherapyOption: boolean;
    Specializations: string; // Zatiaľ predpokladáme, že mock dáta budú obsahovať názvy špecializácií
    TherapyTypes: string;
    Locations: string;
}

export interface PsychologistCardProps {
    psychologist: Psychologist;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({ psychologist }) => {
    return (
        <div className="psychologist-card">
            {psychologist.PhotoURL && (
                <img src={psychologist.PhotoURL}
                     alt={`${psychologist.Name} ${psychologist.LastName}`}
                     style={{ maxWidth: '100px', height: 'auto' }} />
            )}
            <h3>{psychologist.Name} {psychologist.LastName}</h3>
            {psychologist.Specializations && psychologist.Specializations.length > 0 && (
                <p>Špecializácia: {psychologist.Specializations[0]}</p>
            )}
            {/* Môžete pridať ďalšie informácie, ktoré chcete zobraziť na karte, napríklad: */}
            {/* <p>Skúsenosti: {psychologist.Experience}</p> */}
            {/* <p>Cena: {psychologist.PriceRange}</p> */}
        </div>
    );
};

export default PsychologistCard;
