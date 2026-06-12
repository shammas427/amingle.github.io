require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err.message));

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/register", async (req, res) => {

  try {

    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.json({
        success:false,
        message:"Email already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      success:true,
      message:"Registration Successful"
    });

  } catch(err) {

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});

app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.json({
        success:false,
        message:"User not found"
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.json({
        success:false,
        message:"Invalid Password"
      });
    }

    const token = jwt.sign(
      { id:user._id },
      "SECRET_KEY",
      { expiresIn:"7d" }
    );

    res.json({
      success:true,
      token
    });

  } catch(err) {

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});

app.get("/users", async (req,res)=>{

  const users = await User.find();

  res.json(users);

});

app.listen(PORT, ()=>{

  console.log(`🚀 Server Running On ${PORT}`);

});
