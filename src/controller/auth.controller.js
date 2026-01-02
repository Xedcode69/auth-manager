import User from '../models/user.model.js';
import jwtToken from '../utils/jwt.util.js';
import bcrypt from 'bcrypt';
import logger from '../config/logger.config.js';
import { cookies } from '../utils/cookies.util.js';


export const signUp = async(req, res)=>{
    try {
        const {name, email, password, role } = req.body;

        const existingUser = await User.findOne({email: email});

        if (existingUser){
            return res.status(409).json({message: 'user already exist'});
        } 

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({name: name, email: email, password: hashedPassword, role: role});

        const token = jwtToken.sign({payload: newUser._id});

        cookies.set(res, 'token', token);

        res.status(200).json({
            success: true,
            message: "Account created successfully",
            data: {id: newUser._id, 
                name: newUser.name, 
                email: newUser.email,
                role: newUser.role
            }
        })

    } catch (error) {
        logger.error("signup error", error);
        return res.status(500).json({message: error.message});
    }
}


export const signIn = async(req, res)=>{

    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email}).select("+password");

        if (!user){
            return res.status(404).json({
                message: "no user found for that email"
            });
        }       

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword){
            return res.status(403).json({
                message: "password incorrect"
            });
        }

        const token = jwtToken.sign({payload: user._id});

        cookies.set(res, 'token', token);


        return res.status(200).json({
            success: true,
            message: "signed in succesfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })



    } catch (error) {
        logger.error(error);
        next(error);
        }
}


export const signOut = (req, res)=>{

    try {
        cookies.clear(res, 'token');

        return res.status(200).json({
            success: true,
            message: "Logged out"
        });

    } catch (error) {
        logger.error('Logout error', error);
        return res.status(404).json({
            message: error.message
        })
    }
}




