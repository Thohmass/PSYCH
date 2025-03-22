// client/src/utils/mockData.ts
export const psychologists = [
    {
        PsychologistID: '1',
        Name: 'Ján',
        LastName: 'Novák',
        Description: 'Skúsený psychológ so zameraním na...',
        Qualification: 'PhDr.',
        Experience: '10 rokov',
        Languages: ['slovenčina', 'angličtina'],
        PriceRange: '40-60 EUR',
        Address: 'Bratislava',
        Contact: { phone: '+421...', email: 'jan.novak@email.com' },
        PhotoURL: 'url_na_obrazok_jana',
        OnlineTherapyOption: true,
        Specializations: ['Úzkosť', 'Depresia'],
        TherapyTypes: ['Individuálna terapia', 'Kognitívno-behaviorálna terapia'],
        Locations: ['Bratislava']
    },
    {
        PsychologistID: '2',
        Name: 'Anna',
        LastName: 'Kováčová',
        Description: 'Psychologička s citlivým prístupom...',
        Qualification: 'Mgr.',
        Experience: '7 rokov',
        Languages: ['slovenčina'],
        PriceRange: '35-55 EUR',
        Address: 'Košice',
        Contact: { phone: '+421...', email: 'anna.kovacova@email.com' },
        PhotoURL: 'url_na_obrazok_anny',
        OnlineTherapyOption: false,
        Specializations: ['Detská psychológia'],
        TherapyTypes: ['Hrová terapia'],
        Locations: ['Košice']
    },
    // ... ďalší psychológovia
];

