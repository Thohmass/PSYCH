import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { psychologists } from '../utils/mockData'; // Predpokladáme, že máte súbor s mock dátami

// Definícia interfacu pre Psychológa (mala by byť konzistentná s PsychologistCard)
interface Psychologist {
    PsychologistID: string;
    Name: string;
    LastName: string;
    Description: string;
    Qualification: string;
    Experience: string;
    Languages: string[];
    PriceRange: string;
    Address: string;
    Contact: {
        phone: string;
        email: string;
    };
    PhotoURL?: string;
    OnlineTherapyOption: boolean;
    Specializations: string[];
    TherapyTypes: string[];
    Locations: string[];
}

const PsychologistProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Získame ID psychológa z URL parametrov
    const [psychologist, setPsychologist] = useState<Psychologist | undefined>(undefined);

    useEffect(() => {
        // Simulácia načítania dát psychológa na základe ID z mock dát
        const foundPsychologist = psychologists.find(
            (psy) => psy.PsychologistID === id
        );
        setPsychologist(foundPsychologist);
    }, [id]);

    if (!psychologist) {
        return <div>Psychológ nebol nájdený.</div>;
    }

    return (
        <div className="psychologist-profile-page">
            <h2>{psychologist.Name} {psychologist.LastName}</h2>
            {psychologist.PhotoURL && (
                <img src={psychologist.PhotoURL} alt={`${psychologist.Name} ${psychologist.LastName}`} style={{ maxWidth: '200px', height: 'auto' }} />
            )}
            <p>{psychologist.Description}</p>
            <p><strong>Kvalifikácia:</strong> {psychologist.Qualification}</p>
            <p><strong>Skúsenosti:</strong> {psychologist.Experience}</p>
            {psychologist.Specializations && psychologist.Specializations.length > 0 && (
                <p><strong>Špecializácie:</strong> {psychologist.Specializations.join(', ')}</p>
            )}
            {psychologist.TherapyTypes && psychologist.TherapyTypes.length > 0 && (
                <p><strong>Typy terapií:</strong> {psychologist.TherapyTypes.join(', ')}</p>
            )}
            {psychologist.Locations && psychologist.Locations.length > 0 && (
                <p><strong>Lokalita:</strong> {psychologist.Locations.join(', ')}</p>
            )}
            <p><strong>Cena:</strong> {psychologist.PriceRange}</p>
            <p><strong>Online terapia:</strong> {psychologist.OnlineTherapyOption ? 'Áno' : 'Nie'}</p>
            <h3>Kontakt</h3>
            <p><strong>Telefón:</strong> {psychologist.Contact.phone}</p>
            <p><strong>Email:</strong> {psychologist.Contact.email}</p>
            {/* Môžete pridať ďalšie detaily, ktoré chcete zobraziť na profile */}
        </div>
    );
};

export default PsychologistProfilePage;

