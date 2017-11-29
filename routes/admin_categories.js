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
        res.render('admin/add_category', {
            errors,
            title,
            sorting
        });
    } else {
        Category.findOne({title}, function(err, category){
            if(err) return console.log('err in POST add-category, Category.findOne: ', err);
            if(category){
                req.flash("danger", "title used by different category, choose another one");
                res.render('admin/add_category', {
                    title,
                    sorting
                });
            } else {
                let newCategory = new Category({
                    title,
                    sorting
                });
                newCategory.save(function(err){
                    if(err) return console.log('err in POST add-category, newCategory.save: ', err);
                    req.flash("success", "Category added successfully.");
                    res.redirect("/admin/categories");                    
                }); // end of newCategory.save

            } // end of checking if category title exists.
        }); // end ofCategory.findOne
    }; // end of if errors //

}); // end of POST add-category //


//GET for edit-category //
router.get('/edit-category/:id', function(req, res){

    let id = req.params.id;

    Category.findById(id, function(err, category){
        let { _id, title, sorting } = category;
        res.render('admin/edit_category', {
            title,
            sorting,
            id: _id
        }); // end of res.render //
    }); // end of Category.findById //
});  //end of GET for edit-category //

//POST for edit-category //
router.post('/edit-category/:id', function(req, res){
    
    // validation:
    req.checkBody('title', 'Category must have a title').notEmpty();
    let errors = req.validationErrors();
    let {title, sorting, id} = req.body;
    
    if(errors){
        res.render('admin/edit_category', {
            errors,
            title,
            sorting,
            id
        });
    } else {
        Category.findOne({title, _id:{'$ne':id}}, function(err, category){ // category with this title exists, but has diffrent id
            if(err) return console.log('err in Category.findOne: ', err);
            if(category){
                req.flash("danger", "title used by different category, choose another one");
                res.render('admin/add_category', {
                    title,
                    sorting,
                    id
                });
            } else {
                Category.findById(id, function(err, category){

                if(err) return console.log('err in Category.findById: ', err);
                
                // update data recived object
                category.title = title;
                category.sorting = sorting;
                // save to db:
                category.save(function(err){
                    if(err) return console.log('err in category.save: ', err);
                    req.flash('success', 'Category edited successfully!');
                    res.redirect('/admin/categories');
                }); // end of category.save //

                }); // end of Category.findById //
            } // end of if category

        }); // end of Category.findOne
        
    } // end of if errors //

}); //end of POST for edit-category //

//GET for delete-category //
router.get('/delete-category/:id', function(req, res){
    const {id} = req.params;
    Category.findByIdAndRemove(id, function(err){
        if(err) return console.log('error admin_categories, Category.findByIdAndRemove: ', err);
        req.flash('success', 'Category deleted successfully');
        res.redirect('/admin/categories');
    }); // end fo Category.findByIdAndRemove //
});//GET for delete-category //





module.exports = router;