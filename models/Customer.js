const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email"]
  },
  phone: String,
  source: String,
  status: {
    type: String,
    default: "new"
  },
  notes: String
});

module.exports = mongoose.model("Customer", customerSchema);