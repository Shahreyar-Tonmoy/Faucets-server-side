import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../Models/User.model.js";

dotenv.config();

const secret = process.env.ACCESS_TOKEN_SECRET;

const signup = async (req, res) => {
  try {
    const {username, useremail, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      useremail,
      username,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const signin = async (req, res) => {
  try {
    const { useremail, password } = req.body;

    const user = await User.findOne({
      useremail: { $regex: new RegExp(useremail, "i") },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });

    res.json({ token });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





export { signup, signin };
