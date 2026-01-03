import User from "../models/user.model.js";
import jwtToken from "../utils/jwt.util.js";
import { cookies } from "../utils/cookies.util.js";

export const checkAdmin = async(req, res, next)=>{
    try {
        const token = cookies.get(req, 'AUTH_TOKEN');

        if (!token){
            return res.status(403).send("Authentication required");
        }
        
        const decoded = jwtToken.verify(token);

        const userID = decoded.id || decoded.payload

        const user = await User.findById(userID);

        if(!user){
            console.log(decoded);
            return res.status(404).send("user not found");
        }

        if(user.role.trim().toLowerCase() !== 'admin'){
            return res.status(404).json({
                data: user,
                message: "Not an admin"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}