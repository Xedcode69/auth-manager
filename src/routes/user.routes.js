import { Router } from 'express';
import { deleteUser, getAllUsers, getUser } from '../controller/user.controller.js';
import { checkAdmin } from '../middleware/adminCheck.middleware.js';
import authorize from '../middleware/auth.middleware.js';

const userRoutes = Router();

userRoutes.get('/',  (authorize, checkAdmin) ,getAllUsers );

userRoutes.get('/:id', authorize, getUser );

userRoutes.delete('/:id/delete', (authorize, checkAdmin) , deleteUser);

export default userRoutes;