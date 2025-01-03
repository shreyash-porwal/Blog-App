import jwt from "jsonwebtoken";

export function generateToken(user) {
  try {
    const secret = process.env.SECRET_KEY;
    console.log(user);
    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
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
