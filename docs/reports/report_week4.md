# Info o projekte:
- Meno a priezvisko: Tomáš Roch
- Názov projektu: hladampsychologa.sk
- Link na repozitár: https://github.com/Thohmass/PSYCH
- Tag: week4
- Obdobie: 4. týždeň, 10.3. - 16.3.2025

# Plán:
1. Nastavenie vývojového prostredia pre backend (Node.js, Express.js, TypeScript).
2. Výber a nastavenie databázy (Firebase Firestore).
3. Definovanie základných entít a atribútov databázy (User, Psychologist, Specialization, TherapyType, Location).
4. Vytvorenie základnej štruktúry backend aplikácie (adresáre src, routes, controllers).
5. Implementácia základných API endpointov pre entitu Psychológ (vytvorenie, čítanie - Create, Read).
6. Inicializácia Git repozitára s .gitignore na GitHub.

# Vykonaná práca:
1. Nastavené vývojové prostredie pre backend s Node.js, Express.js a TypeScriptom v WebStorm IDE.
   - Commit: `9e609d8c47e845a384e034762e41a5a79802df35`
2. Vybraná a nastavená databáza Firebase Firestore. Inicializované Firebase Admin SDK a firebadeConfig.json.
   - Commit: `3c3ff90f8b0e564c908112210fedc9c9570c82c8`
3. Reorganizácia dokumentov špcifikácie a ERD vrámci repozitára.
   - Commit: `6a1fe5d4635addcf0f5205c6f52593aca426358a`
4. Pridaný .gitignore.
   - Commit: `2eff2019b98f4c0ca290bfb2a383dc29c230658d`

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Meškám s plánom, pretože som čakal na schválenie špecifikácie a myslel, že na tom nemôžem pracovať bez toho

# Plán na ďalší týždeň:
0. Implementácia základných API endpointov pre entitu Psychológ (vytvorenie, čítanie - Create, Read).
1. Frontend setup (React projekt, základná štruktúra komponentov).
2. Implementácia základného UI pre formulár vyhľadávania psychológov (klient-side, s použitím mock dát).
3. Implementácia základného UI pre zobrazenie profilov psychológov (klient-side, s použitím mock dát).
4. Nastavenie základného routingu na frontendovej strane pre navigáciu medzi stránkami.

# Problémy:
Žiadne problémy (okrem meškania) sa počas prvého týždňa nevyskytli.

# Zmeny v špecifikácii:
* Doplnená sekcia o architektúre aplikácie (client-server, SPA).
* Do dátového modelu pridaná entita `Administrator` dediaca z `User` a definované jej atribúty (aktuálne žiadne špecifické okrem dedičných).
* Rozhodnuté o použití Firebase Firestore ako databázy a prispôsobený dátový model pre tento typ databázy (použitie polí odkazov namiesto intermediárnych entít pre mnohé-k-mnohým vzťahy).
* Rozhodnuté o použití TypeScriptu pre backend.
