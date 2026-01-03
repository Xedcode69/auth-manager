import User from '../models/user.model.js';
import logger from '../config/logger.config.js';

export const getAllUsers = async(req, res, next)=>{
    try {
        const allUsers = await User.find();

        res.status(200).json({
            success: true,
            data: allUsers
        });
        next();
    } catch (error) {
        logger.error(error);
        res.status(404).json({
            message: error.messsage
        });
    }
}

export const getUser = async(req, res, next)=>{
    try {
        
        const user = await User.findById(req.params.id);

        if (!user){
            return res.status(404).send("Invalid user");
        }

        res.status(200).json({
            success: true,
            data: user
        });

        next();


    } catch (error) {
        logger.error(error);
        res.status(404).json({
            message: error.message
        });
    }
}

export const deleteUser = async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user){
            return res.status(404).json({
                message: "No user found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        logger.error(error);
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}