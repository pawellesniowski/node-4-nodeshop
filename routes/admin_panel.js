const express = require("express");
const router = express.Router();

router.get('/', function(req, res){
    res.render('admin', {
        title: "admin panel area"
    });
});

module.exports = router;