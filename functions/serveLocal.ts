// import * as dotenv from 'dotenv';
// import * as path from 'path';

// Načíta premenné zo súboru .secret.local v tom istom priečinku (functions/)
// Alebo uprav cestu, ak tvoj .secret.local/.env súbor je inde.
// const envPath = path.resolve(__dirname, '.secret.local'); // Cesta k .secret.local
// dotenv.config({ path: envPath }); // Načíta premenné do process.env

// Importuj samotnú Express aplikáciu, ktorú sme exportovali z index.ts
// Cesta './src/index' je relatívna k umiestneniu tohto súboru (serveLocal.ts)
import { app } from './src';

// Definuj port, na ktorom bude server počúvať
// Môžeš použiť port z environmentálnej premennej PORT, ak je nastavená, inak predvolený port
const port = process.env.PORT || 3001; // Bežný port pre lokálne API

// Spusti server len vtedy, ak je tento súbor spustený priamo (nie importovaný)
// Toto zabezpečí, že tento kód sa nevykoná, keď Firebase Function importuje tvoj index.ts
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Backend server počúva na http://localhost:${port}`);
    console.log(`JWT Secret načítaný: ${!!process.env.JWT_SECRET}`); // Overenie, či sa načítal tajný kľúč
    // Ak sa JWT Secret nenačíta, skontroluj cestu k .secret.local/.env a jeho obsah.
  });
} else {
  // Tento blok sa vykoná, keď Firebase (emulátor alebo cloud) importuje index.ts,
  // ktorý zas importuje časti kódu. app.listen sa nespustí.
  console.log("Backend app je pripravená pre Firebase Functions.");
}