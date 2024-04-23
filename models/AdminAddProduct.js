const mongoose = require("mongoose");

const AdminAddProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String
    },
    admin:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"}
    ]
})

const AddProduct = mongoose.model("AddProduct",AdminAddProductSchema);
module.exports = AddProduct