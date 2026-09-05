const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Don't send password back to frontend
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: safeUser,
    });
  } catch (error) {
    console.error("Signup Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: "student",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Store JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    // Don't send password
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: "student",
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: safeUser,
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  signup,
  login,
  logout,
};