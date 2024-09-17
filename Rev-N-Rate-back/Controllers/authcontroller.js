import jwt from "jsonwebtoken";
import ms from "ms"; 
import Reviewer from "../Models/Reviewer.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { writeFileSync, existsSync, appendFileSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
const generateSecretKey = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const envFilePath = path.join(__dirname, "../.env");
  const key = randomBytes(32).toString("hex");
  if (!existsSync(envFilePath)) {
    writeFileSync(envFilePath, `JWT_SECRET=${key}\n`);
    console.log(`.env file created with JWT_SECRET=${key}`);
  } else {
    const envContent = readFileSync(envFilePath, "utf-8");
    if (!envContent.includes("JWT_SECRET")) {
      appendFileSync(envFilePath, `\nJWT_SECRET=${key}`);
      console.log(`JWT_SECRET=${key} added to existing .env file`);
    }
  }
  return key;
};
const jwtSecret = process.env.JWT_SECRET || generateSecretKey();
const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { username, email, password, profilePic, phone, points } = req.body;
    const existingUser = await Reviewer.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ Message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const reviewer = await Reviewer.create({
      username,
      email,
      password: hashedPassword,
      profilePic,
      phone,
      points,
    });
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
    const token = jwt.sign({ id: reviewer.reviewerId }, jwtSecret, {
      expiresIn: ms(expiresIn),
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { email, password } = req.body;
    const user = await Reviewer.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ ERROR: "Invalid email or password" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ ERROR: "Invalid email or password" });
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
    const token = jwt.sign({ id: user.reviewerId }, jwtSecret, {
      expiresIn: ms(expiresIn),
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged in successfully", token,"data":user });
  } catch (error) {
    res.status(500).json({ ERROR: error.message });
  }
};
export { register, login };
