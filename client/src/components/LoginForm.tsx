import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '@myproject/shared';
import {loginUser} from "../services/authService";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!email || !password) {
            setError('Používateľské meno a heslo sú povinné.');
            setLoading(false);
            return;
        }

        try {
            const loginData = await loginUser(email, password);

            console.log('Úspešne prihlásený ako:', loginData.role);
            // console.log('Získaný token:', loginData.token);

            login(loginData.role as UserRole);

            if (loginData.role === UserRole.Admin) {
                navigate('/admin');
            } else if (loginData.role === UserRole.Psychologist) {
                navigate('/search');
            } else {
                navigate('/');
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