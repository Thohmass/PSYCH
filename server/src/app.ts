import express, { Express, Request, Response } from 'express';
import psychologistRoutes from './routes/psychologistRoutes';
import userAuthRoutes from './routes/authRoutes';

const app: Express = express();
const port = process.env.PORT || 3000;
// const corsOptions = {
//     origin: 'http://localhost:3001',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
// };

app.use(express.json());

// app.use(cors(corsOptions));

app.use('/api/psychologists', psychologistRoutes);
app.use('/api/auth', userAuthRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('HladamPsychologa.sk API beží!');
});

app.listen(port, () => {
    console.log(`Server beží na http://localhost:${port}`);
});