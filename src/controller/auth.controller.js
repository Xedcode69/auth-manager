import User from '../models/user.model.js';
import jwtToken from '../utils/jwt.util.js';
import bcrypt from 'bcrypt';
import logger from '../config/logger.config.js';


export const signUp = async(req, res)=>{
    try {
        const {name, email, password } = req.body;

        const existingUser = await User.findOne({email: email});

        if (existingUser){
            return res.status(409).json({message: 'user already exist'});
        } 

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUsers = await User.create({name: name, email: email, password: hashedPassword});

        const token = jwtToken.sign({payload: newUsers._id});

        res.status(200).json({
            success: true,
            message: "Account created successfully",
            data: token
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
            return res.status(509).json({
                message: "no user found for that email"
            });
        }       

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword){
            return res.status(403).json({
                message: "password incorrect"
            });
        }

        const token = jwtToken.sign({token: user._id});


        return res.status(200).json({
            success: true,
            message: "signed in succesfully",
            token
        })



    } catch (error) {
        logger.error("sign in error", error);
        return res.status(503).json({
            message: error.message
        });
    }
}




