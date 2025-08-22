// payment.mjs
import express from "express";
import Stripe from "stripe";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// MongoDB Payment Schema
const paymentSchema = new mongoose.Schema(
  {
    userId: String,
    amount: Number,
    currency: { type: String, default: "USD" },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    transactionId: String,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

// Create Payment Intent (Live)
router.post("/create-payment", async (req, res) => {
  try {
    const { amount, userId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe works with cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Save transaction in MongoDB
    const payment = new Payment({
      userId,
      amount,
      currency: "USD",
      status: "pending",
      transactionId: paymentIntent.id,
    });
    await payment.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      message: "Live payment created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
