// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import User from "../../../models/User";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { name, email, password, phoneNumber, gender, date } = req.body;

      // Validate input
      if (!name || !email || !password || !phoneNumber || !gender || !date) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
      }

      // Create and save new user
      const user = new User({
        name,
        email,
        password,
        phoneNumber,
        gender,
        date,
      });
      await user.save();

      return res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
