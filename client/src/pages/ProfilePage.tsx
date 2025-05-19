import React, { useState, useEffect } from 'react';
import {
  editPsychologistProfile,
  getPsychologistById
} from '../services/psychologistService';
import {Psychologist, User, UserRole} from "@myproject/shared";
import {useAuth} from "../context/AuthContext";

const ProfilePage: React.FC = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const [psychologist, setPsychologist] = useState<Psychologist | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [editPsychologistData, setEditPsychologistData] = useState<Partial<Psychologist>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/user-data');
      console.log(response);
      const data = await response.json() as User;
      console.log(data);
      setUser(data);
      console.log(data.psychologistId);
      if (data.psychologistId) {
        await fetchPsychologist(data.psychologistId);
        console.log(psychologist);
      }
    } catch (error) {
      setError('Nepodarilo sa načítať detail používateľského profilu.');
      console.error('Chyba pri načítavaní detailu používateľského profilu:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchPsychologist = async (id: string) => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const data = await getPsychologistById(id) as Psychologist;
        console.log(data);
        setPsychologist(data);
      } catch (err: unknown) {
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
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      fetchUser();

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Chyba pri načítaní profilu.');
        if (err.message.includes("Session vypršala") || err.message.includes("oprávnenie")) {
          console.log("Načítanie profilu zlyhalo kvôli vypršanej session. Odhlasujem...");
          logout();
        }
      } else {
        setError("Neznáma chyba pri načítaní profilu.");
      }
    } finally {
      setLoading(false);
    }
    // if (user?.psychologistId) {
    //   fetchPsychologist(user.psychologistId);
    // }
  }, [isAuthenticated, logout]);

  const handleArrayEditChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item !== '');

    setEditPsychologistData({
      ...editPsychologistData,
      [name]: arrayValue
    });
    setSuccessMessage(null);
    setError(null);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;

    // Špeciálne spracovanie pre číselné polia
    if (type === 'number') {
      setEditPsychologistData({
        ...editPsychologistData,
        [name]: parseFloat(value) || 0 // Konvertujeme na číslo, default 0 ak je neplatné
      });
    } else {
      // Bežné spracovanie pre textové polia
      setEditPsychologistData({
        ...editPsychologistData,
        [name]: value
      });
    }
    setSuccessMessage(null); // Vyčistíme správu o úspechu pri začatí úpravy
    setError(null); // Vyčistíme chybu pri začatí úpravy
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Zabráni obnoveniu stránky

    // Základná validácia na frontende (voliteľné, ale dobré)
    // TODO: Pridať komplexnejšiu validáciu dát na frontende pred odoslaním

    setLoading(true); // Nastavíme stav načítania
    setError(null); // Vyčistíme chybu
    setSuccessMessage(null); // Vyčistíme predchádzajúcu správu o úspechu

    try {
      // Zavoláme backendovú službu na aktualizáciu profilu
      const updatedProfile = await editPsychologistProfile(editPsychologistData as Psychologist);

      fetchUser();
      setIsEditing(false);
      setSuccessMessage('Profil úspešne aktualizovaný!');
    } catch (err: any) {
      setError(err.message || 'Nepodarilo sa aktualizovať profil.');
      // Ak aktualizácia zlyhala kvôli 401/403, pravdepodobne vypršala session
      if (err.message.includes("Session vypršala") || err.message.includes("oprávnenie")) {
        console.log("Aktualizácia profilu zlyhala kvôli vypršanej session. Odhlasujem...");
        logout();
      }
    } finally {
      setLoading(false); // Ukončíme stav načítania
    }
  };

  if (loading && !user) return (
    <div className="container">
      <div>Načítavam profil...</div>
    </div>
  ); // Loading pri prvom načítaní
  if (error && !user) return (
    <div className="container">
      <div className="error-message">{error}</div>
    </div>
  ); // Zobrazenie chyby pri prvom načítaní
  if (!isAuthenticated) return (
    <div className="container">
      <div>Pre zobrazenie profilu sa prosím prihláste.</div>
    </div>
  ); // Správa pre neprihlásených
  if (!user && !loading && !error) return (
    <div className="container">
      <div>Profil sa nepodarilo načítať.</div>
    </div>
  );

  if (!user) return (
    <div className="container">
      <div>Profil sa nepodarilo načítať.</div>
    </div>
  );

  return (
    <div className="container user-profile-page">
      <h1>Môj Profil</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && user && <div className="error-message">{error}</div>}
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rola:</strong> {user.role}</p>
      <p><strong>Dátum založenia účtu:</strong> {new Date(user.timeStamp).toLocaleString()}</p>
      <p><strong>ID používateľa:</strong> {user.userId}</p>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <h3>Upraviť údaje profilu</h3>

          <div>
            <label htmlFor="name">Krstné meno:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editPsychologistData.name || ''} // Použi || '' pre zobrazenie prázdneho reťazca ak je hodnota undefined/null
              onChange={handleEditChange}
              disabled={loading} // Zakázať počas ukladania
            />
          </div>
          <div>
            <label htmlFor="description">Popis:</label>
            <textarea
              id="description"
              name="description"
              value={editPsychologistData.description || ''}
              onChange={handleEditChange}
              disabled={loading}
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="priceRange">Cenové rozpätie (€):</label>
            <input
              type="number"
              id="priceRange"
              name="priceRange"
              value={editPsychologistData.priceRange ?? ''}
              onChange={handleEditChange}
              disabled={loading}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="locations">Lokácie praxe (mesto, adresa):</label>
            <input
              type="text"
              id="locations"
              name="locations"
              value={editPsychologistData.locations || ''}
              onChange={handleEditChange}
              disabled={loading}
            />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Ukladám...' : 'Uložiť zmeny'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} disabled={loading} className="secondary">
              Zrušiť
            </button>
          </div>
        </form>
      ) : (
        <>
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
              <button onClick={() => setIsEditing(true)}>Upraviť profil</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;

