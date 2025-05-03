import React, { useState } from 'react';
import { createForumPost } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
import {NewForumPostFormProps} from "../../../shared/src/forum";

const NewForumRootPostForm: React.FC<NewForumPostFormProps> = ( {onPostCreated}) => {
    const { isAuthenticated } = useAuth();
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
            await createForumPost('', '', title, content);
            setSuccessMessage('Príspevok úspešne vytvorený!');
            setTitle('');
            setContent('');
            onPostCreated();
        } catch (err: any) {
            setError(err.message || 'Nepodarilo sa vytvoriť príspevok.');
            console.error('Chyba pri odosielaní príspevku:', err);
        } finally {
            setLoading(false);
        }
    };

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