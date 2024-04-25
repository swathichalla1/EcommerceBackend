const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv")

dotEnv.config();
const secretKey = process.env.SECRET_KEY


const verifytoken = async(req,res,next)=>{
    const token = req.headers.token;
    if (!token){
        return res.status(400).json({error:"Token is required:Backend"})
    }
    try{
        const decoded = jwt.verify(token,secretKey)
        const admin = await Admin.findById(decoded.adminId);
        if(!admin){
            return res.status(404).json({error:"Admin not found:Backend"})
        }
        req.adminId = admin._id
        
        next()
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Invalid Token:Backend"})
    }
}

module.exports = verifytoken