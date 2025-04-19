import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '@myproject/shared';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Úspešne prihlásený ako:', data.role);
                login(data.role);
                if (data.role === UserRole.Admin) {
                    navigate('/admin');
                } else if (data.role === UserRole.Psychologist) {
                    navigate('/search');
                } else {
                    navigate('/');
                }
            } else {
                setError(data.message || 'Nepodarilo sa prihlásiť.');
            }
        } catch (error: any) {
            setError('Chyba pri komunikácii so serverom.');
            console.error('Chyba pri prihlasovaní:', error);
        }
    };

    return (
        <div>
            <h2>Prihlásenie</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Emailová adresa:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete={'email'}
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
                        autoComplete={'password'}
                    />
                </div>
                <button type="submit">Prihlásiť sa</button>
            </form>
        </div>
    );
};

export default LoginForm;