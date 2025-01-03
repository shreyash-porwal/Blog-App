import { verifyToken } from "../services/authentication.js";

export function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenValue = req.cookies?.[cookieName];
    if (!tokenValue) {
      return next();
    }

    try {
      const userPayload = verifyToken(tokenValue);
      req.user = userPayload;
    } catch (err) {
      console.error("Token verification failed:", err);
    }
    return next();
  };
}
