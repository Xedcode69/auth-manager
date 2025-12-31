import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_KEY = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const jwtToken = {
    sign: (payload)=>{
        try {
            return jwt.sign(payload, JWT_KEY, {expiresIn: EXPIRES_IN});
        } catch (error) {
            console.log("error", error);
        }
    },
    verify: (token)=>{
        try {
            return jwt.verify(token, JWT_KEY);
        } catch (error) {
            console.log("something went wrong", error);
        }
    }
}

export default jwtToken;