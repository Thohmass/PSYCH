// client/src/constants/roles.ts
export enum UserRole {
    Client = 'client',
    Psychologist = 'psychologist',
    Admin = 'admin',
}
export type RoleType = UserRole;

export enum Specialization {
    Anxiety = 'Anxiety',
    Depression = 'Depression',
    Relationships = 'Relationships',
    Stress = 'Stress',
    Trauma = 'Trauma',
    // Pridajú sa ďalšie špecializácie podľa potreby
}

export enum TherapyType {
    CBT = 'CBT',
    Psychodynamic = 'Psychodynamic',
    Humanistic = 'Humanistic',
    FamilyTherapy = 'Family Therapy',
    // Pridajú sa ďalšie typy terapií podľa potreby
}

export interface User {
    email: string;
    hashedPassword: string;
    timeStamp: string;
    role: string;
    userId?: string
    psychologistId?: string;
}

export interface Psychologist {
    userId: string;
    name: string;
    lastName: string;
    description: string;
    qualification: string;
    experience: string;
    languages: string[];
    priceRange: string;
    address: string;
    contactInfo: string;
    photoURL?: string;
    onlineTherapyOption: boolean;
    specializations: string[];
    therapyTypes: string[];
    locations: string[];
    id?: string;
}

export interface PsychologistCardProps {
    psychologist: Psychologist;
}