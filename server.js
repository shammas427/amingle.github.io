const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  username:String,
  email:String,
  password:String,
  role:{
    type:String,
    default:"user"
  }
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async(req,res)=>{

  const {username,email,password} = req.body;

  const hash = await bcrypt.hash(password,10);

  const user = new User({
    username,
    email,
    password:hash
  });

  await user.save();

  res.json({
    message:"Registration Successful"
  });

});

app.post("/login", async(req,res)=>{

  const {email,password} = req.body;

  const user = await User.findOne({email});

  if(!user){
    return res.json({
      message:"User Not Found"
    });
  }

  const match =
  await bcrypt.compare(
    password,
    user.password
  );

  if(!match){
    return res.json({
      message:"Wrong Password"
    });
  }

  const token = jwt.sign({
    id:user._id,
    role:user.role
  },
  process.env.JWT_SECRET);

  res.json({
    token,
    username:user.username
  });

});

app.post("/forgot-password",(req,res)=>{

  res.json({
    message:"Password reset feature ready"
  });

});

app.listen(
process.env.PORT,
()=>{
console.log(
"Server Running"
);
});
