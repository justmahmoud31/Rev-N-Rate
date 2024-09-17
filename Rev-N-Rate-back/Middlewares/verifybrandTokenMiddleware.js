import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyBrandToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({
      Status: "ERROR",
      Message: "No token provided",
    });
  }

  const [bearer, jwtToken] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !jwtToken) {
    return res.status(403).json({
      Status: "ERROR",
      Message: "Invalid token format",
    });
  }

  jwt.verify(jwtToken, process.env.JWT_BRAND_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err); // Log the error for debugging
      return res.status(500).json({
        Status: "ERROR",
        Message: "Failed to authenticate token",
      });
    }
    req.brandId = decoded.id;
    next();
  });
};

export default verifyBrandToken;
