import React, { useState } from 'react';
import { submitFeedback } from '../services/feedbackService';

const FeedbackForm: React.FC = () => {
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
            setError('Aspoň niečo by ste tam mohli napísať, keď už idete posielať feedback....');
            setLoading(false);
            return;
        }

        try {
            await submitFeedback(content);
            setSuccessMessage('Ďakujeme za Váš feedback! Fakt fakt moc!');
            setContent('');
        } catch (err: any) {
            setError(err.message || 'Nepodarilo sa odoslať feedback.');
            console.error('Chyba pri odosielaní feedbacku:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Odovzdať Feedback</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="feedbackContent">Váš Feedback:</label>
                    <textarea
                        id="feedbackContent"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Odosielam...' : 'Odoslať Feedback'}</button>
            </form>
        </div>
    );
};

export default FeedbackForm;