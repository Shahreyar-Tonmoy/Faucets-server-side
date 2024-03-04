import express from 'express';

import { getAllUsers, getUserProfile, verifyAdmin } from '../controllers/profileController.js';
import verifyToken from '../Middleware/verifyToken.js';

const userProfile = express.Router();

userProfile.get('/user', verifyToken, getUserProfile);
userProfile.get('/alluser', verifyToken, getAllUsers);
userProfile.get('/verifyadmin', verifyToken, verifyAdmin);



export default userProfile;
