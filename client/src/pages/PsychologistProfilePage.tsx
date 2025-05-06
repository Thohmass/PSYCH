import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPsychologistById } from '../services/psychologistService';
import { Psychologist } from "@myproject/shared";

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
        <div className="container psychologist-profile-page">
            <h2>{psychologist.name} {psychologist.lastName}</h2>
            {psychologist.photoURL && (
                <img src={psychologist.photoURL} alt={`${psychologist.name} ${psychologist.lastName}`}
                     style={{ maxWidth: '200px', height: 'auto' }} />
            )}
            <p>{psychologist.description}</p>
            <p><strong>Kvalifikácia:</strong> {psychologist.qualification}</p>
            <p><strong>Skúsenosti:</strong> {psychologist.experience}</p>
            {psychologist.specializations && psychologist.specializations.length > 0 && (
                <p><strong>Špecializácie:</strong> {psychologist.specializations.join(', ')}</p>
            )}
            {psychologist.therapyTypes && psychologist.therapyTypes.length > 0 && (
                <p><strong>Typy terapií:</strong> {psychologist.therapyTypes.join(', ')}</p>
            )}
            {psychologist.locations && psychologist.locations.length > 0 && (
                <p><strong>Lokalita:</strong> {psychologist.locations.join(', ')}</p>
            )}
            <p><strong>Cena:</strong> {psychologist.priceRange}</p>
            <p><strong>Online terapia:</strong> {psychologist.onlineTherapyOption ? 'Áno' : 'Nie'}</p>
            <h3>Kontakt</h3>
            {/*<p><strong>Telefón:</strong> {psychologist.Contact.phone}</p>*/}
            {/*<p><strong>Email:</strong> {psychologist.Contact.email}</p>*/}
        </div>
    );
};

export default PsychologistProfilePage;

