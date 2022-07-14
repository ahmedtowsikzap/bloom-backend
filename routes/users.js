const router = require("express").Router();

router.get("/usertest", (req,res) => {

    res.send("this is user test & It's successful")
});

router.post("/userposttest", (req,res) => {
    const username = req.body.username
    res.send("user created ")
})

module.exports = router