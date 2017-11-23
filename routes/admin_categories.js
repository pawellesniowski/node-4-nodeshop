const express = require('express');
const router = express.Router();

const Category = require('../models/category.js');

router.get('/', function(req, res){
    res.render('admin/categories')
});

router.get("/add-category", function(req, res){
    res.render('admin/add_category');
});

module.exports = router;