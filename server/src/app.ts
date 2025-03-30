import express, { Express, Request, Response } from 'express';
import psychologistRoutes from './routes/psychologistRoutes';
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(express.json());

app.use(cors(corsOptions));

app.use('/api', psychologistRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('HladamPsychologa.sk API beží!');
});

app.listen(port, () => {
    console.log(`Server beží na http://localhost:${port}`);
});