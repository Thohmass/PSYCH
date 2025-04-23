# Info o projekte:
- Meno a priezvisko: Tomáš Roch
- Názov projektu: hladampsychologa.sk
- Link na repozitár: https://github.com/Thohmass/PSYCH
- Tag: week6
- Obdobie: 5. týždeň, 24.3. - 30.3.2025

# Plán:
1. Prepojenie frontendu s backendovým API pre získavanie zoznamu psychológov.
2. Zobrazenie reálnych dát z backendu na stránke s výsledkami vyhľadávania.
3. Implementácia detailného zobrazenia profilu psychológa s dátami z backendu.
4. Pridanie základných štýlov pre zlepšenie vzhľadu komponentov.

# Vykonaná práca:
1. Implementovaná funkcia `getPsychologists` v `client/src/services/psychologistService.ts` na načítanie zoznamu psychológov z backendového API.
   - Commit: `1743c8ce8977acad6ca6d2853d9d80bf066400ee`
2. Upravený komponent `SearchResultsPage.tsx` na načítanie a zobrazenie reálnych dát psychológov z backendu namiesto mock dát. Riešené stavy načítavania a chýb.
   - Commit: `1743c8ce8977acad6ca6d2853d9d80bf066400ee`
3. Implementovaná funkcia `getPsychologistById` v `client/src/services/psychologistService.ts` na načítanie detailov konkrétneho psychológa z backendového API.
   - Commit: `1da08f58f2ede30b80bc32e7f6c11cfae095d9a4`
4. Upravený komponent `PsychologistProfilePage.tsx` na načítanie a zobrazenie reálnych dát profilu psychológa z backendu namiesto mock dát. Riešené zobrazenie chybovej hlášky pri nenájdení psychológa.
   - Commit: `1da08f58f2ede30b80bc32e7f6c11cfae095d9a4`
5. Pridané základné štýly pre komponenty `SearchForm`, `PsychologistCard` a `PsychologistProfilePage` v `client/src/App.css`.
   - Commit: `7fbe1ffdf63e67c5aa2a310180ce1d5586a7e356`
6. Pridaná vlastnosť `id` do interface `Psychologist` na backendovej strane (`server/src/types/psychologist.ts`) pre zjednotenie dátového typu s frontendom.
   - Commit: `a1e52c9d303125b862582f2159a23acdf091b3a5`

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Všetko sa stihlo.

# Plán na ďalší týždeň:
1. Implementácia filtrovania psychológov na frontendovej strane na základe kritérií z formulára vyhľadávania.
2. Vylepšenie štýlov a responzivity komponentov.
3. Možné pridanie ďalších detailov do profilu psychológa.
4. Začatie práce na implementácii mapy s lokalitami psychológov.

# Problémy:
Počas prepojenia frontendu s backendom sa vyskytol problém s CORS (Cross-Origin Resource Sharing), keď frontend bežiaci na porte 3001 nemohol komunikovať s backendom bežiacim na porte 3000. Tento problém bol vyriešený pridaním a konfiguráciou `cors` middleware v backendovej aplikácii (`server/src/index.ts`).

# Zmeny v špecifikácii:
Žiadne.
