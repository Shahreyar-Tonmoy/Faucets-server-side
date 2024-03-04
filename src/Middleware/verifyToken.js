import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');


  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. Token not provided or in an invalid format.' });
  }

  const tokenValue = token.split(' ')[1];

  jwt.verify(tokenValue, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.userId = decoded.userId;
    next();
  });
};

export default verifyToken;
