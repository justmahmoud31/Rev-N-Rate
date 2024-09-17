import jwt from "jsonwebtoken";
import ms from "ms";
import Brand from "../Models/Brand.js";
import { brandSignupSchema, brandLoginSchema } from "../validators/authbrandvalidator.js";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { writeFileSync, existsSync, appendFileSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const generateBrandSecretKey = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const envFilePath = path.join(__dirname, "../.env");
  const key = randomBytes(32).toString("hex");
  if (!existsSync(envFilePath)) {
    writeFileSync(envFilePath, `JWT_BRAND_SECRET=${key}\n`);
    console.log(`.env file created with JWT_BRAND_SECRET=${key}`);
  } else {
    const envContent = readFileSync(envFilePath, "utf-8");
    if (!envContent.includes("JWT_BRAND_SECRET")) {
      appendFileSync(envFilePath, `\nJWT_BRAND_SECRET=${key}`);
      console.log(`JWT_BRAND_SECRET=${key} added to existing .env file`);
    }
  }
  return key;
};

const jwtBrandSecret = process.env.JWT_BRAND_SECRET || generateBrandSecretKey();

const registerBrand = async (req, res) => {
  try {
    const { error } = brandSignupSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { brandName, categoryId, brandEmail, brandPassword, logo, websiteLink, photos, active, subscription, detail } = req.body;
    const existingBrand = await Brand.findOne({ where: { brandEmail } });
    if (existingBrand)
      return res.status(400).json({ Message: "Brand already exists" });
    const hashedPassword = await bcrypt.hash(brandPassword, 10);
    const brand = await Brand.create({
      brandName,
      categoryId,
      brandEmail,
      brandPassword: hashedPassword,
      logo,
      websiteLink,
      photos,
      active,
      subscription,
      detail,
    });
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
    const token = jwt.sign({ id: brand.brandId }, jwtBrandSecret, {
      expiresIn: ms(expiresIn),
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ message: "Brand registered successfully", token });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const loginBrand = async (req, res) => {
  try {
    const { error } = brandLoginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { brandEmail, brandPassword } = req.body;
    const brand = await Brand.findOne({ where: { brandEmail } });
    if (!brand)
      return res.status(404).json({ ERROR: "Invalid email or password" });
    const validPassword = await bcrypt.compare(brandPassword, brand.brandPassword);
    if (!validPassword)
      return res.status(400).json({ ERROR: "Invalid email or password" });
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
    const token = jwt.sign({ id: brand.brandId }, jwtBrandSecret, {
      expiresIn: ms(expiresIn),
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ ERROR: error.message });
  }
};

export { registerBrand, loginBrand };
