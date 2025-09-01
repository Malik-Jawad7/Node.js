import express from "express";
import Users from "../models/users.mjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "mySecretKey";

// Middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(403).send({ message: "Invalid token" });

    req.userId = decoded._id;
    req.tokenToRemove = token;
    next();
  });
}

// Get all users
router.get("/", async (req, res) => {
  const users = await Users.find();
  res.send({ message: "Data Fetched Successfully", Data: users });
});

// Register
router.post("/register", async (req, res) => {
  try {
    const user = new Users(req.body);
    await user.save();
    res.send({ message: "User registered successfully!" });
  } catch (e) {
    res.send({ message: e.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User Not Found" });
    }

    const isCorrect = user.comparePassword(password);
    if (!isCorrect) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    const token = user.generateToken();
    user.tokens.push(token);
    await user.save();

    res.send({ message: "User logged in successfully!", token });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Logout
router.put("/logout", verifyToken, async (req, res) => {
  await Users.findByIdAndUpdate(req.userId, {
    $pull: { tokens: req.tokenToRemove },
  });
  res.send({ message: "Logged Out Successfully" });
});

export default router;
