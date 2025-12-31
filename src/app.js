import express from 'express'
import authRoutes from './routes/auth.router.js';
import logger from './config/logger.config.js';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(morgan('combined', {stream: {write: (message)=> {logger.info(message.trim())}}}));

app.get('/', (req, res)=>{
    logger.info("Welcome to authentication and authorization manager");
    res.status(200).send('Welcome to authentication manager');
})

app.use('/api/v1/auth', authRoutes);


export default app;