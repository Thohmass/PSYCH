import express, { Express, Request, Response } from 'express';
import psychologistRoutes from './routes/psychologistRoutes';

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware pre spracovanie JSON dát v tele požiadavky
app.use(express.json());

// Pripojenie trás pre psychológov pod prefixom /api
app.use('/api', psychologistRoutes);

// Základná úvodná trasa pre overenie, či server beží
app.get('/', (req: Request, res: Response) => {
    res.send('HladamPsychologa.sk API beží!');
});

app.listen(port, () => {
    console.log(`Server beží na http://localhost:${port}`);
});