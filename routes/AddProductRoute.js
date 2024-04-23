const express = require("express");
const AddProductController = require("../controllers/AddProductController");
const VerifyToken = require("../middleWares/VerifyToken");

const router = express.Router();

router.post("/add-Product",VerifyToken,AddProductController.AddProduct);
router.get("/AllProducts",AddProductController.getAllProducts);
router.get("/:productId",AddProductController.getProductById);
router.delete("/delete/:productId",AddProductController.deleteProductById);


router.get('/uploads/:imageName',(req,res)=>{
    const imageName =req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,"..","uploads",imageName));
})
module.exports = router
