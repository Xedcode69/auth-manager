import express from 'express'
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import logger from './config/logger.config.js';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import arcjetMiddleware from './middleware/arcjet.middleware.js';


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cors());
app.use(morgan('combined', {stream: {write: (message)=> {logger.info(message.trim())}}}));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use(arcjetMiddleware);

app.get('/', (req, res)=>{
    logger.info("Welcome to authentication and authorization manager");
    return res.status(200).send('Welcome to authentication manager');
});
app.get('/api', (req, res)=>{
    res.status(200).send("Auth manager api runnning");
})

export default app;