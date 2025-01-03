import { verifyToken } from "../services/authentication.js";
export function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenValue = req.cookies[cookieName];
        
        // If no token is present, proceed to the next middleware
        if (!tokenValue) {
            return next();
        }

        try {
            // Verify the token and attach the user payload to the request object
            const userPayload = verifyToken(tokenValue);
            req.user = userPayload;
        } catch (err) {
            // Log the error for debugging purposes
            console.error("Error verifying token:", err);

            // Optionally, clear the invalid cookie
            res.clearCookie(cookieName);
        }

        // Proceed to the next middleware
        next();
    };
}
