import { verifyToken } from "../services/authentication.js";
export function checkForAuthenticationCookie(cookieName){
    return (req,res,next) => {
        const tokenValue = req.cookie[cookieName];
        if(!tokenValue)
        {
            return next();
        }
        try{
            const userPayload = verifyToken(tokenValue);
            req.user = userPayload;
        }catch(err){

        }
        next();

    };
}