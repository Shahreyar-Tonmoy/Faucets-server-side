import express from 'express';
import verifyToken from '../Middleware/verifyToken.js';
const logoutRoute = express.Router();


logoutRoute.post('/logout', verifyToken, (req, res) => {
  try {

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default logoutRoute;
