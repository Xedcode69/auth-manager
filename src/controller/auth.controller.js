import User from '../models/user.model.js';
import jwtToken from '../utils/jwt.util.js';
import bcrypt from 'bcrypt';


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
        console.log("signup error", error);
        return res.status(500).json({message: error.message});
    }
}

