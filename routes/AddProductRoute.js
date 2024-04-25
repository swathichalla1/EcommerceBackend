const express = require("express");
const AddProductController = require("../controllers/AddProductController");
const VerifyToken = require("../middleWares/VerifyToken");
const path = require("path");

const router = express.Router();

router.post("/add-Product",VerifyToken,AddProductController.AddProduct);
router.get("/AllProducts",AddProductController.getAllProducts);
router.get("/:productId",AddProductController.getProductById);
router.delete("/delete/:productId",AddProductController.deleteProductById);


router.get('/uploads/:imageName',(req,res)=>{
    console.log("url hitted");
    const imageName =req.params.imageName;
    res.headersSent('content-Type','image/jpeg');
    console.log(path.join(__dirname,"..","uploads",imageName));
    res.sendFile(path.join(__dirname,"..","uploads",imageName));
})
module.exports = router
