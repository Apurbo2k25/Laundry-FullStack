const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const sendEmail = require("./utils/emailService.js");

const app = express();

app.use(cors({ origin: "https://laundrymaster-wb.netlify.app" }));
app.use(express.json());

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Schema
const bookingSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  items: Array,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});
const Booking = mongoose.model("Booking", bookingSchema);

// POST Route
app.post("/api/bookings", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    // Call extracted email service
    await sendEmail(req.body);

    res.status(201).json({ message: "Booking saved and detailed email sent!" });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: "Failed to process booking" });
  }
});

app.get("/api/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
