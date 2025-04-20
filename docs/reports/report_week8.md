# Info o projekte:
- Meno a priezvisko: Tomáš Roch
- Názov projektu: hladampsychologa.sk
- Link na repozitár: https://github.com/Thohmass/PSYCH
- Tag: week8
- Obdobie: 8. týždeň, 7.4. - 13.4.2025

# Plán:
1. Pokračovať v implementácii mapy s lokalitami psychológov, tentokrát však použiť `AdvancedMarkerElement`.
2. Implementácia používateľskej autentifikácie (Firebase Authentication alebo iný mechanizmus).
3. Implementácia používateľských rolí (Klient, Psychológ, Administrátor) v backend aj frontend aplikácii.
4. Zabezpečenie API endpointov na backendovej strane na základe používateľských rolí (prístupové práva).
5. Implementácia základného prihlasovania a registrácie pre Psychológov a Administrátorov na frontende.
6. Testovanie a finalizácia beta verzie pripravenej na odovzdanie a feedback.

# Vykonaná práca:
1. Implementácia používateľskej autentifikácie (Firebase Database, ale žiaden built in Firebase Authentication).
   - Commit: `fc226155bd960279816bf4be6bb117a9a32e32ff`
2. Implementácia používateľských rolí (Klient, Psychológ, Administrátor) v backend aj frontend aplikácii.
   - Commit: `fc226155bd960279816bf4be6bb117a9a32e32ff`
3. Zabezpečenie API endpointov na backendovej strane na základe používateľských rolí (prístupové práva).
   - Commit: `fc226155bd960279816bf4be6bb117a9a32e32ff`
4. Implementácia základného prihlasovania a registrácie pre Psychológov a Administrátorov na frontende.
   - Commit: `38579b82134935c1d625de20db8c0f9a1cd781b3`
5. Úpravy štruktúry projektu, zdieľanie interfaces a enums v shared a misc. úpravy.
   - Commit: `bd2e0fd83c5f90ce15d74e0e809a35a1a20efcd8`

# Zdôvodnenie rozdielov medzi plánom a vykonanou prácou:
Nestihlo sa hĺbkové testovanie a vylepšenie grafického dizajnu stránky a novšej verzie mapy (čo však pokladám za voliteľné).

# Plán na ďalší týždeň:
1. Vylepšenie UI/UX pre základné funkcionality na základe doterajšieho vývoja a testovania.
2. Vytvoriť backend funkcionalitu pre Fórum (otázky, príspevky, komentáre).
3. Vytvoriť frontend pre Fórum.
4. Získanie feedbacku na Beta verziu a následná analýza.
5. Vypracovanie základu dizajnu hlavnej stránky a jej štruktúri.

# Problémy:
Importovanie súborov mimo src directory na frontende. Neiktoré idú, iné zas nie.

# Zmeny v špecifikácii:
Žiadne.
