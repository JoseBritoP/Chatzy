import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import cookieparser from 'cookie-parser'
import mainRouter from './routes';
import { corstOptions } from './config/cors';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corstOptions));
app.use(cookieparser())

app.use('/', mainRouter );


export default app;