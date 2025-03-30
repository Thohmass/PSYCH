
export interface Psychologist {
    PsychologistID: string;
    Name: string;
    LastName: string;
    Description: string;
    Qualification: string;
    Experience: string;
    Languages: string[];
    PriceRange: string;
    Address: string;
    ContactInfo: string;
    PhotoURL?: string;
    OnlineTherapyOption: boolean;
    Specializations: string[];
    TherapyTypes: string[];
    Locations: string[];
    id?: string;
}

export interface PsychologistCardProps {
    psychologist: Psychologist;
}