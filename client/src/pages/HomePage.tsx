// client/src/pages/HomePage.tsx
import React from 'react';
// Ak máš v App.tsx nastavenú routu pre '/', nemusíš sem importovať useAuth
// Ale ak áno, tak: import { useAuth } from '../context/AuthContext';


// Definovanie dát o poskytovateľoch priamo v kóde (HARDCODED)
// Neskôr sa tieto dáta budú načítavať z backendu
const providersData = [
  { name: "Meno Priezvisko 1", website: "https://webpsychologa1.sk", category: "Súkromní Psychológovia a Psychoterapeuti" },
  { name: "Meno Priezvisko 2", website: "https://webpsychologa2.sk", category: "Súkromní Psychológovia a Psychoterapeuti" },
  { name: "Psychologická agentúra Alfa", website: "https://webagenturyalfa.sk", category: "Centrá a Agentúry" },
  { name: "Centrum psychologickej pomoci Beta", website: "https://webcentrumbeta.sk", category: "Centrá a Agentúry" },
  { name: "Nezisková organizácia Gama", website: "https://webneziskovkagama.sk", category: "Neziskové Organizácie a OZ" },
  { name: "Občianske združenie Delta", website: "https://webozdelta.sk", category: "Neziskové Organizácie a OZ" },
  { name: "Všeobecná zdravotná poisťovňa", website: "https://www.vszp.sk", category: "Poisťovne" },
  { name: "Dôvera zdravotná poisťovňa", website: "https://www.dovera.sk", category: "Poisťovne" },
  { name: "Union zdravotná poisťovňa", website: "https://www.union.sk", category: "Poisťovne" },
  { name: "MUDr. Ema Krízová", website: "https://webpsychiaterkrizova.sk", category: "Psychiatri" },
  { name: "MUDr. Filip Liečivý", website: "https://webpsychiaterliecivy.sk", category: "Psychiatri" },
  { name: "CPaP Mesto Bratislava", website: "https://webcpapbratislava.sk", category: "CPaP" },
  { name: "CPaP Mesto Košice", website: "https://webcpapkosice.sk", category: "CPaP" },
  { name: "Linka Dôvery Nezábudka", website: "https://www.linkanezabudka.sk/", category: "Krízové Linky a Centrá" },
  { name: "IPčko.sk (online poradňa)", website: "https://ipcko.sk", category: "Krízové Linky a Centrá" },
];


const groupedProviders = providersData.reduce((acc, provider) => {
  const category = provider.category || 'Ostatné'; // Ak nemá kategóriu, zaradíme do "Ostatné"
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(provider);
  return acc;
}, {} as Record<string, typeof providersData>); // Typové pretypovanie pre lepší typový safety


const HomePage: React.FC = () => {

  return (
    <div className="container">
      <h1>Vitajte na hladamskychologa.sk</h1>
      <p>
        Hľadáte psychologickú pomoc na Slovensku? Stránka hladamskychologa.sk je tu, aby vám pomohla zorientovať sa a nájsť vhodného odborníka či službu.
        Ponúkame prehľad psychológov, psychiatrov, psychoterapeutov, agentúr, neziskových organizácií, krízových liniek a ďalších poskytovateľov pomoci.
        Naším cieľom je uľahčiť vám prístup k potrebnej podpore na vašej ceste k duševnej pohode.
      </p>
      <p>Ak si nie ste istí, aký typ pomoci hľadať, vyskúšajte náš <a href="/survey">dotazník</a> a získajte prvé odporúčania.</p>
      <p>Tu nájdete zoznam poskytovateľov psychologickej pomoci a súvisiacich služieb na Slovensku.</p>

      {Object.keys(groupedProviders).map(category => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {groupedProviders[category].map(provider => (
              <li key={provider.name}> {/* Kľúč by mal byť unikátny, ak by bol názov rovnaký*/}
                <a href={provider.website} target="_blank" rel="noopener noreferrer">
                  {provider.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Prípadné ďalšie sekcie stránky */}

    </div>
  );
};

export default HomePage;