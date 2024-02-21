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

const rateLimitMs = Number(process.env.RATE_LIMIT_MS)
const rateLimitMin = rateLimitMs / 60000
const rateLimitMax = Number(process.env.RATE_LIMIT_MAX)

app.use(expressRateLimit({
  windowMs: rateLimitMs,
  max: rateLimitMax,
  message: `Você excedeu o limite de ${rateLimitMax} requisições por minuto, volte novamente em ${rateLimitMin} ${rateLimitMin == 1 ? 'minuto' : 'minutos'}!`
}));

app.use(routes);

app.listen(process.env.PORT, () => console.log(`Servidor rodando em http://localhost:${process.env.PORT}`))
