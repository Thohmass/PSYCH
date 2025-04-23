// client/src/services/feedbackService.ts
export const submitFeedback = async (content: string): Promise<void> => {
    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Nepodarilo sa odoslať feedback.');
        }
        // Ak je odpoveď OK (napr. status 201), nemusíme vrátiť nič alebo vrátiť úspešnú správu
    } catch (error: any) {
        console.error('Chyba pri odosielaní feedbacku:', error);
        throw error;
    }
};