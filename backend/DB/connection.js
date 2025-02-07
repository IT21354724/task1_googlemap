require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.MONGODB_URI;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = mongoose;
