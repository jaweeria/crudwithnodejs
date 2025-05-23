const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect("mongodb://127.0.0.1:27017/Patient", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
