import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generateToken(user) {
  try {
    const secret = process.env.SECRET_KEY;

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, secret);
    return token;
  } catch (error) {
    return null;
  }
}

export function verifyToken(token) {
  const secret = process.env.SECRET_KEY;
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
}
