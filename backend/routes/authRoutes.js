import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.json({ msg: "Email already exists" });

  const hashedPass = await bcrypt.hash(password, 10);

  user = new User({ name, email, password: hashedPass });
  await user.save();

  res.json({ msg: "Registered Successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.json({ msg: "Email not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ msg: "Wrong Password" });

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

  res.json({ msg: "Login Success", token });
});

// Forget Password
router.post("/forgot-password", async (req, res) => {
  const { email, newPassword } = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.json({ msg: "Email not found" });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  res.json({ msg: "Password Updated" });
});

export default router;
