const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://laundrymaster-wb.netlify.app",
  }),
);
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Booking Schema (Matches your existing database structure)
const bookingSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  items: Array,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

// --- NODEMAILER SETUP ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST Route for Bookings
app.post("/api/bookings", async (req, res) => {
  try {
    // 1. Save the data to MongoDB
    const newBooking = new Booking(req.body);
    await newBooking.save();

    // 2. Send the confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email, // Sends to the customer's email
      subject: "Laundrolink Booking Confirmation",
      text: `Hi ${req.body.fullName},\n\nWe received your order for ₹${req.body.totalPrice}. We will 
      contact you at ${req.body.phone} soon!\n\nThanks for choosing us.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Booking saved and email sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process booking" });
  }
});

app.get("/api/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port http://localhost:${PORT}`),
);
