import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  return token;
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email!" });
    }
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return res.status(400).json({ message: "User are already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    generateToken(res, user._id)
    return res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(!user || !(await bcrypt.compare(password, user.password))){
     return res.status(400).json({message:"Invalid email or password!"})
    }
    generateToken(res,user._id)
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
