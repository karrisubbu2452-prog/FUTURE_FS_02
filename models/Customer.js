const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  source: String,
  status: {
    type: String,
    default: "new"
  },
  notes: String
});

module.exports = mongoose.model("Customer", customerSchema);