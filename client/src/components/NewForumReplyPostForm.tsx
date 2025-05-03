import React, { useState } from 'react';
import { createForumPost } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
import {useParams} from "react-router-dom"; // Import useAuth hook na kontrolu prihlásenia
import { NewForumPostFormProps } from "../../../shared/src/forum";

const NewForumReplyPostForm: React.FC<NewForumPostFormProps> = ({ onPostCreated}) => {
    const { isAuthenticated } = useAuth();
    const { postId } = useParams<{ postId: string }>();
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        if (!content) {
            setError('Obsah príspevku je povinný.');
            setLoading(false);
            return;
        }

        try {
            if (!postId) {
                setError('Nepodarilo sa načítať predošlú správu.');
                setLoading(false);
                return;
            }
            // Voláme funkciu z nášho servisného súboru na odoslanie dát na backend
            await createForumPost(postId, postId, '', content);
            setSuccessMessage('Príspevok úspešne vytvorený!');
            setContent('');
            onPostCreated();
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
            <h4>Odpovedať</h4>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="postContent">Obsah:</label>
                    <textarea id="postContent" value={content} onChange={(e) => setContent(e.target.value)} required disabled={loading} />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Odosielam...' : 'Odoslať príspevok'}</button>
            </form>
        </div>
    );
};

export default NewForumReplyPostForm;