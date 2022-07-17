const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE

router.post("/", verifyToken,  async (req,res) => {
 
        const newOrder = new Order(req.body)
        try{
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);

        }catch(err){
            res.status(500).json(err)
        }
})

// UPDATE 

router.put("/:id",  verifyTokenAndAdmin,  async (req, res) => {

    try{
       const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
         {
        $set: req.body
       }, {new:true})
       res.status(200).json(updatedOrder)
    }catch(err){res.status(500).json(err)}
});

// DELETE

router.delete("/:id", verifyTokenAndAuthorization , async (req,res) => {

    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been cleared!")
    }catch(err){
        res.status(500).json(err)
    }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // //GET ALL USERCART 

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

////// GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) =>{
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }


})

module.exports = router