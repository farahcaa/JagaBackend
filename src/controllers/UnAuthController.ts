import { Request, Response } from "express";
import tees from "../models/Tees";
import hoodies from "../models/Hoodies";
import bycript from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY as string;
interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  dateofbirth: string;
}

export const handleTest = (req: Request, res: Response) => {
  console.log("Test route hit");
  res.send({ token: "test" });
};

export const handleGetTees = async (req: Request, res: Response) => {
  try {
    const teedata = await tees.find();

    res.json(teedata);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tees", error });
  }
};

export const handleGetTeesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tee = await tees.findOne({ _id: id });
    if (!tee) {
      res.status(404).json({ message: "Tee not found" });
      return;
    }
    res.json(tee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching t-shirt", error });
  }
};

export const handleGetHoodies = async (req: Request, res: Response) => {
  try {
    const hoodiedata = await hoodies.find();

    res.json(hoodiedata);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hoodies", error });
  }
};

export const handleGetHoodiesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const hoodie = await hoodies.findOne({ id: id });
    if (!hoodie) {
      res.status(404).json({ message: "Hoodie not found" });
    }
    res.json(hoodie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Hoodie", error });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Fetch the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found!" });
      return;
    }

    // Compare the provided password with the hashed password
    const isMatch = await bycript.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

const isSignupData = (data: any): data is SignupData => {
  return (
    typeof data === "object" &&
    typeof data.firstname === "string" &&
    typeof data.lastname === "string" &&
    typeof data.email === "string" &&
    typeof data.phone === "string" &&
    typeof data.password === "string" &&
    typeof data.dateofbirth === "string"
  );
};

export const handleSignup = async (req: Request, res: Response) => {
  const data = req.body;
  if (!isSignupData(data)) {
    res.status(400).json({ message: "Invalid signup data" });
    return;
  }

  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const saltRounds = 10;
    const hashedPassword = await bycript.hash(data.password, saltRounds);
    const newUser = new User({ ...data, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const handleGetTop = async (req: Request, res: Response) => {
  try {
    var top = await tees.find().limit(3);
    top = top.concat(await hoodies.find().limit(3));
    res.json(top);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top", error });
  }
};

export const handleComputePayment = async (req: Request, res: Response) => {
  const items = req.body;
  try {
    let total = 0;
    for (const id of items) {
      const tee = await tees.findOne({ _id: id });
      if (tee) {
        total += tee.price;
        continue;
      }
      const hoodie = await hoodies.findOne({ _id: id });
      if (hoodie) {
        total += hoodie.price;
        continue;
      }
    }
    total += 5;
    res.json(total);
  } catch (error) {
    res.status(500).json({ message: "Error computing payment", error });
    return;
  }
};
