require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Customer = require("./models/Customer");

const app = express();

app.use(cors());

app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// ✅ ADD DATA ROUTE
app.post("/add", async (req, res) => {
  try {
    const data = await Customer.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/data", async (req, res) => {
  try {
    const data = await Customer.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const data = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DB CONNECT (ONLY ONCE)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ SERVER START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});