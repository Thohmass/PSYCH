import React, { useState, useEffect } from 'react';
import { getPsychologistById } from '../services/psychologistService';
import {Psychologist, User} from "@myproject/shared";
import {Link, useNavigate} from "react-router-dom";

const ProfilePage: React.FC = () => {
  const [psychologist, setPsychologist] = useState<Psychologist | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/user-data');
      const data = await response.json() as User;
      setUser(data);
      if (data.psychologistId) {
        await fetchPsychologist(data.psychologistId);
      }
    } catch (error) {
      setError('Nepodarilo sa načítať detail príspevku fóra.');
      console.error('Chyba pri načítavaní detailu príspevku fóra:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchPsychologist = async (id: string) => {
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
  }

  useEffect(() => {
    fetchUser();
    // if (user?.psychologistId) {
    //   fetchPsychologist(user.psychologistId);
    // }
  }, []);

  if (loading) {
    return <div>Načítavam profil používateľa...</div>;
  }

  if (error) {
    return <div>Chyba: {error}</div>;
  }

  if (!user) {
    return <div>Používateľ nebol nájdený.</div>;
  }

  return (
    <div className="user-profile-page">
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rola:</strong> {user.role}</p>
      <p><strong>Dátum založenia účtu:</strong> {new Date(user.timeStamp).toLocaleString()}</p>
      <p><strong>ID používateľa:</strong> {user.userId}</p>
      {psychologist && (
        <div>
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
      )}
      <button onClick={() => navigate("/profile/edit")}>Upraviť profil</button>
    </div>
  );
};

export default ProfilePage;

