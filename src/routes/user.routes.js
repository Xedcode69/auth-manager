import { Router } from 'express';
import { deleteUser, getAllUsers, getUser } from '../controller/user.controller.js';
import { checkAdmin } from '../middleware/adminCheck.middleware.js';

const userRoutes = Router();

userRoutes.get('/',  checkAdmin ,getAllUsers );

userRoutes.get('/user/:id', getUser );

userRoutes.delete('/user/:id/delete', checkAdmin, deleteUser);

export default userRoutes;