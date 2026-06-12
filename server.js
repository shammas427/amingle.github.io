require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("🚀 Server Running");
});
