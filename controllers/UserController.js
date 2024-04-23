const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");


dotEnv.config();

const secretKey = process.env.SECRET_KEY;

const UserRegister = async(req,res)=>{
  const {username,email,password} = req.body 
try{
const CheckEmailInDB = await User.findOne({email});
if (CheckEmailInDB){
    return res.status(400).json("Email already taken!!");
}
const hashedPassword = await bcrypt.hash(password,10);
const newUser = new User({
    username,
    email,
    password:hashedPassword
});
await newUser.save();
res.status(201).json({message:"User registered succesfully:Backend"});
console.log("User registered succes:Backend")
}catch(error){
    console.log("Backend : ",error)
res.status(500).json({error:"Internal server error:Backend"})
}
}


const UserLogin = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if (!user || !(await bcrypt.compare(password,user.password))){
          return res.status(401).json({"error":"Invalid details :Backend"})
        }
        const token = jwt.sign({userId:user._id},secretKey,{expiresIn:"1h"})
        console.log("User login succesfull:Backend");
        res.status(200).json({success:" UserLogin successful:Backend",token})
        
    }catch(error){
        console.log("Backend : ",error)
res.status(500).json({error:"Internal server error:Backend"})
    }
}

module.exports = {UserRegister,UserLogin}