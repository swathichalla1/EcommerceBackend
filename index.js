const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const AdminRoute = require("./routes/AdminRoute")
const UserRoute = require("./routes/UserRoute");
const cors = require("cors");
const AddProductRoutes = require("./routes/AddProductRoute");
const path = require("path");
app.use(cors());
const PORT = process.env.PORT||5001;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected Successfully"))
.catch((error)=>console.log(error))

app.use(bodyParser.json());
app.use('/Admin',AdminRoute);
app.use('/User',UserRoute);
app.use('/Product',AddProductRoutes);
app.use('/uploads',express.static("uploads"),AddProductRoutes);


app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`);
})

app.use("/",(req,res)=>{
    res.send("Welcome to ecommerce")
})
