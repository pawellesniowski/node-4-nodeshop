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
        let title = "";
        let sorting = "";

    res.render('admin/add_category', {
        title,
        sorting
    });
});
//POST for add-category //
router.post('/add-category', function(req, res){

    //validation:
    req.checkBody('title', 'title is required').notEmpty();

    let title = req.body.title;
    let sorting = req.body.sorting === ""? 100 : req.body.sorting;
    let errors = req.validationErrors();

    if(errors){
        console.log("some errors", errors);
        res.render('admin/add_category', {
            errors,
            title,
            sorting
        });
    } else {
        Category.findOne({title}, function(err, category){
            if(err) return console.log("findOne category error: ", err);
            if(category){
                req.flash('danger', 'Category title taken, choose anotherone');
                res.render('admin/add_category', {
                    title,
                    sorting
                });
            } else {
                const newCategory = new Category({
                    title,
                    sorting
                });
                newCategory.save(function(err){
                    if(err) return console.log("newCategory saving error: ", err);
                    req.flash('success', 'Category added');
                    res.redirect('/admin/categories');
                })
            }
        })
    }


    console.log('title: ', title);
    console.log("sorting: ", sorting);
    
       
    
});


module.exports = router;