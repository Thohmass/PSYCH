import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPsychologistById } from '../services/psychologistService';
import { Psychologist } from "../../../shared/DatabaseInterfaces";

const PsychologistProfilePage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [psychologist, setPsychologist] = useState<Psychologist | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPsychologist = async () => {
            if (id) {
                setLoading(true);
                setError(null);
                try {
                    const data = await getPsychologistById(id);
                    setPsychologist(data);
                } catch (err: any) {
                    setError('Nepodarilo sa načítať profil psychológa.');
                    console.error('Chyba pri načítavaní profilu psychológa:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setError('Chýba ID psychológa v URL.');
                setLoading(false);
            }
        };

        fetchPsychologist();
    }, [id]);

    if (loading) {
        return <div>Načítavam profil psychológa...</div>;
    }

    if (error) {
        return <div>Chyba: {error}</div>;
    }

    if (!psychologist) {
        return <div>Psychológ nebol nájdený.</div>;
    }

    return (
        <div className="psychologist-profile-page">
            <h2>{psychologist.Name} {psychologist.LastName}</h2>
            {psychologist.PhotoURL && (
                <img src={psychologist.PhotoURL} alt={`${psychologist.Name} ${psychologist.LastName}`}
                     style={{ maxWidth: '200px', height: 'auto' }} />
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
            {/*<p><strong>Telefón:</strong> {psychologist.Contact.phone}</p>*/}
            {/*<p><strong>Email:</strong> {psychologist.Contact.email}</p>*/}
        </div>
    );
};

export default PsychologistProfilePage;

