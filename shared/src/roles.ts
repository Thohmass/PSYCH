// client/src/constants/roles.ts
export enum UserRole {
    Client = 'client',
    Psychologist = 'psychologist',
    Admin = 'admin',
}

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

export type RoleType = UserRole;