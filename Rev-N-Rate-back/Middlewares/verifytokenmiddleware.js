import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({
      Status: "ERROR",
      Message: "No token has provided",
    });
  }
  const [bearer, jwtToken] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !jwtToken) {
    return res.status(403).json({
      Status: "ERROR",
      Message: "Invalid token format",
    });
  }
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        Status: "ERROR",
        Message: "Failed to authenticate token",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
export default verifyToken;
