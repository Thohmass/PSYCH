import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importujte useNavigate

interface SearchFormProps {}

const SearchForm: React.FC<SearchFormProps> = () => {
    const [keywords, setKeywords] = useState('');
    const [location, setLocation] = useState('');
    const [specialization, setSpecialization] = useState('');
    const navigate = useNavigate(); // Inicializujte hook useNavigate

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Vyhľadávacie kritériá:', { keywords, location, specialization });
        navigate('/search');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="keywords">Kľúčové slovo:</label>
                <input
                    type="text"
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Napr. úzkosť, depresia"
                />
            </div>
            <div>
                <label htmlFor="location">Lokalita:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Napr. Bratislava, online"
                />
            </div>
            <div>
                <label htmlFor="specialization">Špecializácia:</label>
                <input
                    type="text"
                    id="specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="Napr. detská psychológia, párová terapia"
                />
            </div>
            <button type="submit">Hľadať</button>
        </form>
    );
};

export default SearchForm;
