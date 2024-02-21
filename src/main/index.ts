import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import expressRateLimit from 'express-rate-limit';

import { routes } from './routes'

export const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use(expressRateLimit({
  windowMs: Number(process.env.RATE_LIMIT_MS),
  max: Number(process.env.RATE_LIMIT_MAX),
  message: `Você excedeu o limite de requisições de ${process.env.RATE_LIMIT_MAX} por minuto, volte novamente em ${Number(process.env.RATE_LIMIT_MS) / 60000} minutos!`
}));

app.use(routes);

app.listen(process.env.PORT, () => console.log(`Servidor rodando em http://localhost:${process.env.PORT}`))
