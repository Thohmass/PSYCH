# Info o projekte:
- Meno a priezvisko: Tomáš Roch
- Názov projektu: hladampsychologa.sk
- Link na repozitár: https://github.com/Thohmass/PSYCH
- Tag: week7
- Obdobie: 7. týždeň, 31.3. - 6.4.2025

# Plán:
1. Implementácia filtrovania psychológov na frontendovej strane na základe kritérií z formulára vyhľadávania.
2. Vylepšenie štýlov a responzivity komponentov.
3. Možné pridanie ďalších detailov do profilu psychológa.
4. Začatie práce na implementácii mapy s lokalitami psychológov.
5. Autentifikácia a používateľské role

# Vykonaná práca:
1. Implementované filtrovanie psychológov na frontendovej strane pomocou URL parametrov.
   - Commit: `5529914b1a8241f66211d98b82174a04d83f1be5`
2. Implementované reišenie CORS nastavením proxy na klientovi.
   - Commit: `a563b876b38da2d0a14f44fc624a44d4d58a0101`
3. Zabezpečený prístup k Google Maps API kľúču a implementácia komponentu `Map.tsx` pre zobrazenie mapy s lokalitami psychológov pomocou knižnice `@react-google-maps/api`.
   - Commit: `c35ab8607cc3c854248950a362e23af32bab69d6`
4. Zozbierané základné informácie od študentov psychológie ohľadom budúceho obsahu webovej aplikácie a jej význame.
   - Commit: N/A
5. Malá úprava štýlov v zobrazovaní vyhľadávania a profilov psychológov, update .gitignore a App.tsx.
   - Commit: `a1fea2cb5eb40b46326c3ec2a4e3d664876d1a01`

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Nastihlo sa Autentifikácia a používateľské role. Je to len rozrobené a nevyšiel na to čas tento týždeň.

# Plán na ďalší týždeň:
1. Pokračovať v implementácii mapy s lokalitami psychológov, tentokrát však použiť `AdvancedMarkerElement`.
2. Implementácia používateľskej autentifikácie (Firebase Authentication alebo iný mechanizmus).
3. Implementácia používateľských rolí (Klient, Psychológ, Administrátor) v backend aj frontend aplikácii.
4. Zabezpečenie API endpointov na backendovej strane na základe používateľských rolí (prístupové práva).
5. Implementácia základného prihlasovania a registrácie pre Psychológov a Administrátorov na frontende.
6. Testovanie a finalizácia beta verzie pripravenej na odovzdanie a feedback.

# Problémy:
* Pri implementácii mapy sa nepodarilo použiť `AdvancedMarkerElement` z knižnice `@react-google-maps/api`. Dočasne budeme používať staršiu verziu `Marker`.

# Zmeny v špecifikácii:
Žiadne.
