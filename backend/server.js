const express = require("express");
const cors = require("cors");
const mongoose = require("./DB/connection"); // Import MongoDB connection
const userRoutes = require("./routes/User");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
