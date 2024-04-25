const AdminAddProduct = require("../models/AdminAddProduct");
const Admin = require("../models/Admin");
const multer = require("multer");
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory for storing uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
    }
});

// Multer upload configuration

const upload = multer({ storage: storage });


const AddProduct = async(req,res)=>{

    try{
        const{productName,rating,price,description} = req.body;
        const image = req.file?req.file.filename:undefined;
         
        
        const admin = await Admin.findById(req.adminId);
        if (!admin){
            res.status(404).json({message:"Admin not found:Backend"})
        }
    
        const addProduct = new AdminAddProduct({
            productName,rating,price,description,image,admin:admin._id
        })

        

        
    
        const savedProduct = await addProduct.save();
        
        admin.addProduct.push(savedProduct);
        await admin.save();
        return res.status(200).json({message:"Product added succesfully:Backend"})
    }catch(error){
        console.log(error);
        res.status(500).json("internal server error:Backend");
    }
}


const getProductById = async(req,res)=>{
    const productId = req.params.productId

    try{
        const detailedProduct = await AdminAddProduct.findById(productId);
        if (!detailedProduct){
            res.status(404).json({message:"Product not found:Backend"})
        }

        res.status(200).json({message:"Product detailed fetched",detailedProduct})


    }catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error:Backend"});
    }
}

const deleteProductById = async(req,res)=>{
    try{
        const productId = req.params.productId;
        const deletedProduct = await AdminAddProduct.findByIdAndDelete(productId);

        if(!deletedProduct){
            return res.status(404).json({error:"No product found:Backend"})
        }
        res.status(200).json({message:"Product deleted succesfully:Backend"});
    }catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error:Backend"});
    }
}

const getAllProducts = async(req,res)=>{

    try{
        const Products = await AdminAddProduct.find();
        
        if (!Products){
            res.status(404).json({message:"unable to fetch products:Backend"})
        }

        res.status(200).json({message:"Products fetched sucessfully",Products})


    }catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error:Backend"});
    }
}


module.exports = {AddProduct:[upload.single("image"),AddProduct],getProductById,deleteProductById,getAllProducts}