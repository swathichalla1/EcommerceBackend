const Admin = require('../models/Admin');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");


dotEnv.config();

const secretKey = process.env.SECRET_KEY;

const AdminRegister = async(req,res)=>{
  const {username,email,password} = req.body 
try{
const CheckEmailInDB = await Admin.findOne({email});
if (CheckEmailInDB){
    return res.status(400).json({error:"Email already taken!!"});
}
const hashedPassword = await bcrypt.hash(password,10);
const newAdmin = new Admin({
    username,
    email,
    password:hashedPassword
});
await newAdmin.save();
res.status(201).json({message:"Admin registered succesfully:Backend"});
console.log("Admin registered succes:Backend")
}catch(error){
    console.log("Backend : ",error)
res.status(500).json({error:"Internal server error:Backend"})
}
}


const AdminLogin = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const admin = await Admin.findOne({email});
        if (!admin || !(await bcrypt.compare(password,admin.password))){
          return res.status(401).json({"error":"Invalid details :Backend"})
        }
        const token = jwt.sign({adminId:admin._id},secretKey,{expiresIn:"1h"})
        console.log("Admin login succesfull:Backend");
        res.status(200).json({success:"Login successful:Backend",token})
        
    }catch(error){
        console.log("Backend : ",error)
res.status(500).json({error:"Internal server error:Backend"})
    }
}

const getAllAdmins = async(req,res)=>{
    try{

        const admins = await Admin.find().populate('addProduct');
        res.json({admins})

    }catch(error){
       console.log(error);
       res.status(500).json({error:"Internal server error:Backend"});
    }
}


const getAdminById = async(req,res)=>{
    const adminId = req.params.adminId
    try{
        const admin = await Admin.findById(adminId).populate('addProduct');
        if(!admin){
            return res.status(404).json({error:"Admin not found:Backend"})
        }
        
        res.status(200).json({message:"Admin found succesfully:Backend",admin});

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error:Backend"});
    }
}

const getProductsOfAdmin = async(req,res)=>{
    const adminid = req.params.adminid
    try{
        const adminproducts = await Admin.findById(adminid).populate('addProduct');
        if(!adminproducts){
            return res.status(404).json({error:"Admin products not found:Backend"})
        }
        const onlyProducts = adminproducts.addProduct;
        res.status(200).json({message:"Admin products found succesfully:Backend",onlyProducts});

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error:Backend"});
    }
}

module.exports = {AdminRegister,AdminLogin,getAllAdmins,getAdminById,getProductsOfAdmin}