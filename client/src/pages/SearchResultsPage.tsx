import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPsychologists } from '../services/psychologistService';
import PsychologistCard from '../components/PsychologistCard';
import { Psychologist } from "../../../shared/DatabaseInterfaces";
import Map from "../components/Map";

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [psychologistsList, setPsychologistsList] = useState<Psychologist[]>([]);
    const [filteredPsychologists, setFilteredPsychologists] = useState<Psychologist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const keywordsFilter = searchParams.get('keywords');
    const locationFilter = searchParams.get('location');
    const specializationFilter = searchParams.get('specialization');

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

    useEffect(() => {
        if (!loading && psychologistsList.length > 0) {
            const filtered = psychologistsList.filter(psychologist => {
                const matchesKeywords = !keywordsFilter || `${psychologist.Name} ${psychologist.LastName} ${psychologist.Description}`.toLowerCase().includes(keywordsFilter.toLowerCase());
                const matchesLocation = !locationFilter || psychologist.Locations.some(loc => loc.toLowerCase().includes(locationFilter.toLowerCase()));
                const matchesSpecialization = !specializationFilter || psychologist.Specializations.some(spec => spec.toLowerCase().includes(specializationFilter.toLowerCase()));
                return matchesKeywords && matchesLocation && matchesSpecialization;
            });
            setFilteredPsychologists(filtered);
        }
    }, [psychologistsList, keywordsFilter, locationFilter, specializationFilter, loading]);


    if (loading) {
        return <div>Načítavam psychológov...</div>;
    }

    if (error) {
        return <div>Chyba: {error}</div>;
    }

    return (
        <div>
            <h2>Výsledky vyhľadávania</h2>
            {filteredPsychologists.length > 0 ? (
                filteredPsychologists.map((psychologist) => (
                    <PsychologistCard key={psychologist.id} psychologist={psychologist} />
                ))
            ) : (
                <div>Žiadni psychológovia nespĺňajú zadané kritériá.</div>
            )}

            <h3>Mapa s lokalitami psychológov</h3>
            <Map psychologists={filteredPsychologists} />
        </div>
    );
};

export default SearchResultsPage;