import express from 'express'
import authRoutes from './routes/auth.router.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.status(200).send('Welcome to authentication manager');
})

app.use('/api/v1/auth', authRoutes);


export default app;