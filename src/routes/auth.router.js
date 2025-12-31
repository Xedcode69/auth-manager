import { Router } from 'express'
import { signIn, signUp } from '../controller/auth.controller.js';


const authRoutes = Router();


authRoutes.post('/signup', signUp);

authRoutes.post('/signin', signIn);

authRoutes.post('/signout', (req, res)=>{
    app.send("signout here");
});

export default authRoutes;
