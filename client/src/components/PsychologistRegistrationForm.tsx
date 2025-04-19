import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Psychologist} from "@myproject/shared";
import {Specialization, TherapyType} from "@myproject/shared";

const fieldConfig: {
    [K in keyof Psychologist]?: {
        label: string;
        type: 'text' | 'textarea' | 'checkbox' | 'select' | 'multiselect';
        required?: boolean;
        options?: string[];
    };
} = {
    Name: { label: 'Meno', type: 'text', required: true },
    LastName: { label: 'Priezvisko', type: 'text', required: true },
    Description: { label: 'Popis', type: 'textarea' },
    Qualification: { label: 'Kvalifikácia', type: 'text' },
    Experience: { label: 'Skúsenosti', type: 'textarea' },
    Languages: { label: 'Jazyky (oddelené čiarkou)', type: 'text' },
    PriceRange: { label: 'Cenové rozpätie', type: 'text' },
    Address: { label: 'Adresa', type: 'text' },
    ContactInfo: { label: 'Kontaktné informácie', type: 'text' },
    PhotoURL: { label: 'URL fotografie (voliteľné)', type: 'text' },
    OnlineTherapyOption: { label: 'Možnosť online terapie', type: 'checkbox' },
    Specializations: {
        label: 'Špecializácie',
        type: 'multiselect',
        options: Object.values(Specialization),
    },
    TherapyTypes: {
        label: 'Typy terapie',
        type: 'multiselect',
        options: Object.values(TherapyType),
    },
    Locations: { label: 'Lokality (oddelené čiarkou)', type: 'text' },
};

const PsychologistRegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<Partial<Psychologist>>({
        OnlineTherapyOption: false,
        Specializations: [],
        TherapyTypes: [],
        Languages: [],
        Locations: [],
    });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleChange = (key: keyof Psychologist, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (password !== confirmPassword) {
            setError('Heslá sa nezhodujú.');
            return;
        }

        const payload = {
            username,
            password,
            ...formData,
            // Languages: typeof formData.Languages === 'string'
            //     ? (formData.Languages as string).split(',').map((l) => l.trim())
            //     : formData.Languages,
            // Locations: typeof formData.Locations === 'string'
            //     ? (formData.Locations as string).split(',').map((l) => l.trim())
            //     : formData.Locations,
        };

        try {
            const response = await fetch('/api/auth/register-psychologist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setError(data.message || 'Nepodarilo sa vytvoriť účet psychológa.');
            }
        } catch (error: any) {
            setError('Chyba pri komunikácii so serverom.');
            console.error('Chyba pri registrácii psychológa:', error);
        }
    };

    return (
        <div>
            <h2>Registrácia psychológa</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Používateľské meno:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Heslo:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Potvrďte heslo:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {Object.entries(fieldConfig).map(([key, config]) => {
                    const value = formData[key as keyof Psychologist] ?? '';
                    const fieldKey = key as keyof Psychologist;

                    if (config.type === 'textarea') {
                        return (
                            <div key={key}>
                                <label>{config.label}:</label>
                                <textarea
                                    value={value as string}
                                    onChange={(e) => handleChange(fieldKey, e.target.value)}
                                    required={config.required}
                                />
                            </div>
                        );
                    }

                    if (config.type === 'checkbox') {
                        return (
                            <div key={key}>
                                <label>{config.label}:</label>
                                <input
                                    type="checkbox"
                                    checked={value as boolean}
                                    onChange={(e) => handleChange(fieldKey, e.target.checked)}
                                />
                            </div>
                        );
                    }

                    if (config.type === 'multiselect') {
                        return (
                            <div key={key}>
                                <label>{config.label}:</label>
                                <select
                                    multiple
                                    value={value as string[]}
                                    onChange={(e) =>
                                        handleChange(
                                            fieldKey,
                                            Array.from(e.target.selectedOptions).map((o) => o.value)
                                        )
                                    }
                                >
                                    {config.options?.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    }
                    return (
                        <div key={key}>
                            <label>{config.label}:</label>
                            <input
                                type={config.type}
                                value={value as string}
                                onChange={(e) => handleChange(fieldKey, e.target.value)}
                                required={config.required}
                            />
                        </div>
                    );
                })}
                <button type="submit">Zaregistrovať sa</button>
            </form>
        </div>
    );
};

export default PsychologistRegistrationForm;