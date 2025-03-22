# Info o projekte:
- Meno a priezvisko: Tomáš Roch
- Názov projektu: hladampsychologa.sk
- Link na repozitár: https://github.com/Thohmass/PSYCH
- Tag: week5
- Obdobie: 5. týždeň, 17.3. - 23.3.2025

# Plán:
0. Implementácia základných API endpointov pre entitu Psychológ (vytvorenie, čítanie - Create, Read).
1. Frontend setup (React projekt, základná štruktúra komponentov).
2. Implementácia základného UI pre formulár vyhľadávania psychológov (klient-side, s použitím mock dát).
3. Implementácia základného UI pre zobrazenie profilov psychológov (klient-side, s použitím mock dát).
4. Nastavenie základného routingu na frontendovej strane pre navigáciu medzi stránkami.

# Vykonaná práca:
0. Implementované základné API endpointy pre entitu Psychológ (vytvorenie a čítanie) v `psychologistController.ts` a definované trasy v `psychologistRoutes.ts`. Prepojené s `app.ts`.
   - Commits: `c534bf90b773e56ee6531f20c7b77b4fc88eb37d`, `080c6d6abeee7ebeb80137a9a5d3c1e2348adcc2`
1. Nastavené vývojové prostredie pre frontend (React projekt s TypeScriptom) a vytvorená základná štruktúra priečinkov (`components`, `pages`, `assets`, `hooks`, `utils`, `styles`).
   - Commit: `59b5c66d81cf73590f4c1ca24189773ec19a8652`
2. Implementované základné UI pre formulár vyhľadávania psychológov (`SearchForm.tsx`) s použitím React state na ovládanie vstupných polí a simuláciou vyhľadávania pomocou mock dát.
   - Commit: `1c108b6dc438f652a129bb87a0f3a772e64c1e84`
3. Implementované základné UI pre zobrazenie profilov psychológov (`PsychologistCard.tsx` pre zoznam a `PsychologistProfilePage.tsx` pre detail) s použitím mock dát.
   - Commit: `1c108b6dc438f652a129bb87a0f3a772e64c1e84`
4. Nastavený základný routing na frontendovej strane pomocou `react-router-dom` pre navigáciu medzi domovskou stránkou, stránkou s výsledkami vyhľadávania a detailom profilu psychológa.
   - Commit: `1c108b6dc438f652a129bb87a0f3a772e64c1e84`

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Dobehli sa body z predošlého týždňa a všetky plánované body pre druhý týždeň boli úspešne dokončené.

# Plán na ďalší týždeň:
1. Prepojenie frontendu s backendovým API pre získavanie zoznamu psychológov.
2. Zobrazenie reálnych dát z backendu na stránke s výsledkami vyhľadávania.
3. Implementácia detailného zobrazenia profilu psychológa s dátami z backendu.
4. Pridanie základných štýlov pre zlepšenie vzhľadu komponentov.

# Problémy:
Žiadne, čo by sa nestihli behom týždňa vyriešiť.

# Zmeny v špecifikácii:
Žiadne.
