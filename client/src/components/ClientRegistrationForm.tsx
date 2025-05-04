import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientRegistrationForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError('Heslá sa nezhodujú.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password}),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(data.message || 'Nepodarilo sa vytvoriť účet klienta.');
      }
    } catch (error: any) {
      setError('Chyba pri komunikácii so serverom.');
      console.error('Chyba pri registrácii klienta:', error);
    }
  }


    return (
    <div>
      <h2>Registrácia klienta</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Emailová adresa:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Zaregistrovať sa</button>
      </form>
    </div>
  );
};

export default ClientRegistrationForm;