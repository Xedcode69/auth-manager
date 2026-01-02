import aj from "../config/arcjet.config.js";
import { slidingWindow } from "@arcjet/node";
import logger from "../config/logger.config.js";

const arcjetMiddleware = async (req, res, next)=>{
    try {
        const client = aj.withRule(slidingWindow({mode: "LIVE", interval:60, max: 20, name: "rate limit exceeded"}));

        const decision = await client.protect(req);
        if (decision.isDenied()){
            if (decision.reason.isShield()){
                logger.warn("shield blocked request", {ip: req.ip, path: req.path});
                res.status(403).json({error: "forbidden", message: "request denied"} );
            }
            if (decision.reason.isBot()){
                logger.warn("bot detected", {ip: req.ip, path: req.path});
                res.status(403).json({error: "forbidden", message: "request denied"} );
            }
            if (decision.reason.isRateLimit()){
                logger.warn("rate limited", {ip: req.ip, path: req.path});
                res.status(403).json({error: "forbidden", message: "request denied"} );
            }
        }
        next();

    } catch (error) {
        return res.status(500).json({
            error: "arcjet middleware error",
            message: "something went wrong"
        })
    }
}

export default arcjetMiddleware;