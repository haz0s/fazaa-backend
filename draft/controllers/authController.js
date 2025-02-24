// src/controllers/authController.js

const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User(username, email, password);

  await user.hashPassword();

  // Save user to the database here (you will implement this later)

  res.status(201).json({ message: "User registered successfully" });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Retrieve user from the database here and compare passwords

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};
