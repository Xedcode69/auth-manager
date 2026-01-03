import jwtToken from "../utils/jwt.util.js";
import { cookies } from "../utils/cookies.util.js";
import User from "../models/user.model.js";
import logger from "../config/logger.config.js";


const authorize = async (req, res, next)=> {
    try {
        const token = cookies.get(req, 'AUTH_TOKEN');

    // const token = req.headers.authorization.split(' ')[1];

        if (!token){
            return res.status(404).send('Unauthorized');
        }
        const decoded = jwtToken.verify(token);

        const user = await User.findById(decoded.payload);

        if(!user){
            return res.status(404).send('Unauthorized');
        }

        req.user = user;

        next()


    } catch (error) {
        logger.error(error)
        return res.status(401).json({
            success: false,
            error: error.message
        }
        )
    }
}

export default authorize;

