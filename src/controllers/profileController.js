import { User } from "../Models/User.model.js";

const API_MESSAGES = {
  UNAUTHORIZED: "Access denied. User not authenticated.",
  NOT_FOUND: "User not found",
  SUCCESS_ALL_USERS: "All users retrieved successfully",
  ERROR_FETCHING_USERS: "Error fetching users",
};

const API_MESSAGE = {
  UNAUTHORIZED: "Access denied. User not authenticated.",
  NOT_FOUND: "User not found",
  NOT_ADMIN: "Access denied. User is not an admin.",
  ADMIN_VERIFIED: "User is an admin.",
  ERROR_FETCHING_USER: "Error fetching user",
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Access denied. User not authenticated." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      message: "User email retrieved successfully",
      user: user,

      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: API_MESSAGES.UNAUTHORIZED });
    }

    // Get the currently logged-in user
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ message: API_MESSAGES.NOT_FOUND });
    }

    // Retrieve all users except the currently logged-in user
    const allUsers = await User.find({ _id: { $ne: userId } });

    res.status(200).json({
      status: "success",
      message: API_MESSAGES.SUCCESS_ALL_USERS,
      users: allUsers,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ error: API_MESSAGES.ERROR_FETCHING_USERS });
  }
};

const verifyAdmin = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: API_MESSAGE.UNAUTHORIZED });
    }

    // Get the currently logged-in user
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ message: API_MESSAGE.NOT_FOUND });
    }

    let admin = currentUser?.role === "admin";
    console.log(admin);

    if (!admin) {
      return res.status(403).json({ admin: false });
    }

    res.json({ admin: true });
  } catch (error) {
    res.status(500).json({ error: API_MESSAGE.ERROR_FETCHING_USER });
  }
};

export { getUserProfile, getAllUsers, verifyAdmin };
