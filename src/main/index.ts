import { rateLimitMiddleware } from '../common/middlewares/rate-limit';
import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { routes } from './routes'

dotenv.config();
export const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimitMiddleware());

app.use(routes);

app.listen(process.env.PORT, () => console.log(`Servidor rodando em http://localhost:${process.env.PORT}`))
