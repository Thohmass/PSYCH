import {Psychologist} from "@myproject/shared";

export const getPsychologistById = async (id: string) => {
    try {
        const response = await fetch(`/api/psychologists/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Chyba pri načítavaní psychológa s ID ${id}:`, error);
        throw error;
    }
};

export const getPsychologists = async (): Promise<Psychologist[]> => {
    try {
        const response = await fetch(`/api/psychologists`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data as Psychologist[];
    } catch (error) {
        console.error('Chyba pri načítavaní psychológov:', error);
        throw error;
    }
};

export const editPsychologistProfile = async (data: Psychologist) => {
    try {
        const response = await fetch(`/api/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Chyba pri zmene údajov psychológa: ", error,)
        throw error;
    }
}