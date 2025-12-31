import { Router } from 'express'
import { signUp } from '../controller/auth.controller.js';


const authRoutes = Router();


authRoutes.post('/signup', signUp);

authRoutes.post('/singin', (req, res)=>{
    res.send("signin here");
});

authRoutes.post('/signout', (req, res)=>{
    app.send("signout here");
});

export default authRoutes;
