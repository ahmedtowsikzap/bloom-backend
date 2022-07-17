const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE

router.post("/", verifyToken,  async (req,res) => {
 
        const newCart = new Cart(req.body)
        try{
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);

        }catch(err){
            res.status(500).json(err)
        }
})

// UPDATE 

router.put("/:id",  verifyTokenAndAuthorization,  async (req, res) => {

    try{
       const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
         {
        $set: req.body
       }, {new:true})
       res.status(200).json(updatedCart)
    }catch(err){res.status(500).json(err)}
});
  
module.exports = router