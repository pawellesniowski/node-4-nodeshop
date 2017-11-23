const express = require('express');
const router = express.Router();

const Category = require('../models/category.js');

// GET for categories //
router.get('/', function(req, res){
    Category.find(function(err, categories){
        if(err) return console.log('error in admin_categories.js: ', err);
        res.render('admin/categories', {
            categories
        });
    });
});



// GET for add-category //
router.get("/add-category", function(req, res){
    res.render('admin/add_category', {
        title: "",
        slug: "",
        sorting: ""
    });
});
//POST for add-category //
router.post('/add-category', function(req, res){
    let title = req.body.title;
    let slug = req.body.slug;

    res.send('categorry added');
    console.log('title: ', title);
    console.log("slug: ", slug);   
    
});


module.exports = router;