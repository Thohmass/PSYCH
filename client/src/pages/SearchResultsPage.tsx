import React, { useState, useEffect } from 'react';
import { getPsychologists } from '../services/psychologistService';
import PsychologistCard from '../components/PsychologistCard';
import {Psychologist } from "../../../shared/PsychologistInterfaces";

const SearchResultsPage: React.FC = () => {
    const [psychologistsList, setPsychologistsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPsychologists = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getPsychologists();
                setPsychologistsList(data);
            } catch (err: any) {
                setError('Nepodarilo sa načítať psychológov.');
                console.error('Chyba pri načítavaní psychológov:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPsychologists();
    }, []);

    if (loading) {
        return <div>Načítavam psychológov...</div>;
    }

    if (error) {
        return <div>Chyba: {error}</div>;
    }

    return (
        <div>
            <h2>Výsledky vyhľadávania</h2>
            {psychologistsList.map((psychologist: Psychologist) => (
                <PsychologistCard key={psychologist.id} psychologist={psychologist} />
            ))}
        </div>
    );
};

export default SearchResultsPage;