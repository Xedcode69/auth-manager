import { Router } from 'express'
import { signIn, signOut, signUp } from '../controller/auth.controller.js';


const authRoutes = Router();


authRoutes.post('/signup', signUp);

authRoutes.post('/signin', signIn);

authRoutes.post('/signout', signOut);

export default authRoutes;
