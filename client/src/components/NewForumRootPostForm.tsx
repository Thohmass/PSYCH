import React, { useState } from 'react';
import { createForumPost } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
import {NewForumPostFormProps} from "../../../shared/src/forum";

const NewForumRootPostForm: React.FC<NewForumPostFormProps> = ( {onPostCreated}) => {
    const { isAuthenticated, userId } = useAuth(); // Získame stav prihlásenia
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        if (!title || !content) {
            setError('Názov a obsah príspevku sú povinné.');
            setLoading(false);
            return;
        }

        try {
            // Voláme funkciu z nášho servisného súboru na odoslanie dát na backend
            const newPost = await createForumPost('', '', userId, title, content);
            setSuccessMessage('Príspevok úspešne vytvorený!');
            setTitle(''); // Vyčistíme formulár po úspešnom odoslaní
            setContent('');
            onPostCreated();
            // Tu by si mohol napríklad:
            // - presmerovať používateľa na detail vytvoreného príspevku (ak ho backend vráti)
            // - aktualizovať zoznam príspevkov na stránke (ak si na stránke zoznamu)
        } catch (err: any) {
            setError(err.message || 'Nepodarilo sa vytvoriť príspevok.');
            console.error('Chyba pri odosielaní príspevku:', err);
        } finally {
            setLoading(false);
        }
    };

    // Zobrazíme formulár len ak je používateľ prihlásený
    if (!isAuthenticated) {
        return <div>Pre písanie príspevkov do fóra sa prosím prihláste.</div>;
    }

    return (
        <div>
            <h3>Vytvoriť nový príspevok</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="postTitle">Názov:</label>
                    <input type="text" id="postTitle" value={title} onChange={(e) => setTitle(e.target.value)} required disabled={loading} />
                </div>
                <div>
                    <label htmlFor="postContent">Obsah:</label>
                    <textarea id="postContent" value={content} onChange={(e) => setContent(e.target.value)} required disabled={loading} />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Odosielam...' : 'Odoslať príspevok'}</button>
            </form>
        </div>
    );
};

export default NewForumRootPostForm;