# Info o projekte:
- Meno a priezvisko: Tomáš Roch
- Názov projektu: hladampsychologa.sk
- Link na repozitár: https://github.com/Thohmass/PSYCH
- Link na verejnú inštanciu projektu: https://hladampsychologa.web.app

# Info o reportovanej verzii:
- Tag: final

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
- Registrácia nového účtu:
  - email: akýkoľvek fake email (verifikácia nie je implementovaná)
  - heslo: nemusí spĺňať žiadne requirements

# Postup, ako rozbehať vývojové prostredie 
1. Zbuildiť vlastný package pre frontend
    - Pomocou terminálu v priečinku *shared* vykonať príkaz `npm run build`.
2. Nainštalovať packages
    - Pomocou terminálu v priečinkoch *functions* a *client* vykonať príkaz `npm install`. Tým sa stiahnu všetky packages.
3. Na testovanie treba spustiť backend, potom frontend.
    - Pomocou terminálu v priečinkoch *functions* vykonať príkaz `firebase deploy --only functions, hosting`. Backend bude bežať na firebase serveri.
    - Následne v priečinku *client* vykonať príkaz `npm start`. Stránka by sa mala otvoriť už sama.

# Stav implementácie:
### Implementované
- Registrácia Psychológa aj Klienta
- Prihlasovanie/Odhlasovanie
- Vyhľadávanie psychológov
- Rôzne používateľské role
- Zobrazenie lokalít psychológov na mape
- Fórum
    - Čítanie príspevkov
    - Písanie príspevkov
    - Odpovedanie na príspevky
- Zbieranie feedbacku
- Formulár na odporúčenie psychologickej pomoci
- Zoznam poskytovateľov psychologickej pomoci ()
### Rozpracované
- Upravovanie detailov účtu (chýba frontend)
- Rozsiahlejší filter psychológov
- Databáza poskytovateľov psychologickej pomoci
### Neimplementované
- Neobmedzená hĺbka reakcii vo fóre (voliteľná funkcia)
- Vyhľadávanie postov vo fóre (extra)
- Vymazávanie postov na fóre
- Zoznam obľúbených psychológov klienta (voliteľné)
- Verifikácia emailu (neplánované)
- Zmena hesla alebo emailu (neplánované)

# Retrospektíva:
- Ak by som nevyužíval Firebase funkcionality, tak by som sa radšej kompletne vyhol jeho používaniu. Niektoré veci to len skomplikovalo, aj keď nie som si istý, o koľko jednoduchšie/náročnejšie by to bolo iným spôsobom.
- Spravil by som pekné CSS štýly už skôr - je oveľa príjemnejšie testovať stránku a ďalej na nej pracovať, keď vyzerá dobre.
- Implementoval by som secure authentication už hneď na začiatku a nezvolil jednoduchšie riešenie, ktoré budem musieť neskôr aj tak prerobiť.
- Využíval by som skúsenosti a znalosti, ktoré som získal vrámci tohto projektu. Teraz som išiel v zásade od nuly, takže nabudúce to bude oveľa lepšie.
- Najviac sa mi na projekte podarilo zvoliť si zámer a tému projektu. Zo všetkých aspektov je to pre mňa najhodnotnejšie.


