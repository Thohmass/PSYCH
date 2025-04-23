# Info o projekte:
- Meno a priezvisko: Tomáš Roch
- Názov projektu: hladampsychologa.sk
- Link na repozitár: https://github.com/Thohmass/PSYCH
- Link na verejnú inštanciu projektu: https://hladampsychologa.web.app

# Info o reportovanej verzii:
- Tag: beta

# Info k testovaniu:
- Prihlasovanie na stránku:
  - Administrátor
    - email: admin@admin.com
    - heslo: password
  - Psychológ
    - email: psych@psych.com
    - heslo password
  - Klient
    - email: client@client.com
    - heslo: password

# Postup, ako rozbehať vývojové prostredie
1. Zbuildiť vlastný package pre frontend
   - Pomocou terminálu v priečinku *shared* vykonať príkaz `npm run build`.
2. Nainštalovať packages
   - Pomocou terminálu v priečinkoch *functions* a *client* vykonať príkaz `npm install`. Tým sa stiahnu všetky packages. 
3. Na testovanie treba spustiť backend, potom frontend.
   - Pomocou terminálu v priečinkoch *functions* vykonať príkaz `npm run dev`. Backend bude bežať na porte 3000 (localhost)
   - Následne v priečinku *client* vykonať príkaz `npm start`. Ak sa terminál spýta, či spustiť frontend na porte 3001 (alebo inom) namiesto 3000, dajte zvoľte odpoveď Yes (y). Stránka by sa mala otvoriť už sama.

# Stav implementácie:
### Implementované
- Registrácia psychológa
- Prihlasovanie
- Vyhľadávanie psychológov
- Rôzne používateľské role
- Zobrazenie lokalít na mape
- Fórum
  - Čítanie príspevkov
  - Písanie príspevkov
  - Odpovedanie na príspevky
- Zbieranie feedbacku
### Rozpracované
- Registrácia klienta a admina
- Upravovanie detailov účtu
- Rozsiahlejší filter psychológov
### Neimplementované
- Formulár na odporúčenie psychologickej pomoci
- Zoznam poskytovateľov psychologickej pomoci
- Neobmedzená hĺbka reakcii vo fóre (voliteľná funkcia)
- Vyhľadávanie postov vo fóre

# Časový plán:
### Týždeň 1 od bety
- Registrácia Klienta a Admina
- Funckionalita upravovania detailov používateľského účtu
- Implementácia Feedbacku z bety
### Týždeň 2 od bety
- Formulár na odporúčenie psychologickej pomoci
- Zoznam poskytovateľov psychologickej pomoci (organizácie, poisťovne...)
- Vyhľadávanie postov vo fóre

# Problémy:
- Pre jednotné types pre backend aj forntend som vytvoril shared folder, s ktorým však mal problém frontend, tak som z toho musel urobiť package. S tým má zase problém backend. Tento problém na chvíľu zmizol, potom sa zas objavil, tak som pred betou dáta skopíroval do frontendu aj backendu a odložil riešenie na neskôr.