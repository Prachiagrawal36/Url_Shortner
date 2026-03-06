import {validateUserToken} from "../utils/token.js"

export function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    // console.log("Authorization header:", authHeader);

    if (!authHeader) return next();

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(400).json({
            error: "Authorization must start with Bearer"
        });
    }

    const token = authHeader.split(" ")[1];

    const payload = validateUserToken(token);

    if (!payload) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = payload;

    next();
}
 export function ensureAuthenticated (req,res,next){
    if(!req.user || !req.user.id){
        // console.log("req.user:", req.user);
        return res.status(401).json({error: "You are not logged in..."})
    }
    next();
 }