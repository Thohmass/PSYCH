export const getPsychologistById = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/psychologists/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Chyba pri získavaní psychológa s ID:', error);
        throw error;
    }
};

export const getPsychologists = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/psychologists');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Chyba pri získavaní psychológov:', error);
        throw error;
    }
};