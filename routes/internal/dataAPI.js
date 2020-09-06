const express = require("express");
const router = express.Router();
const generatedData = require("../../modules/controller/DetailsController");

router.get("/", function(req,res, next){
    res.send("Score and Status");
});

module.exports = router;