const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    addProduct:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"AddProduct"
        }
    ]
});

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin