import jwt from 'jsonwebtoken';

const authBrand = (req, res, next) => {
  const token = req.cookies.brandToken;
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, process.env.JWT_BRAND_SECRET);
    req.brand = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

export default authBrand;
