const express = require("express");
const router = express.Router();
const Page = require('../models/page.js'); // get Page model (for database)

// GET pages index: //
router.get('/', function(req, res){
    Page.find({}).sort({sorting:1}).exec(function(err, pages){
        res.render('admin/pages', {
            pages
        });
    });
});

// GET add page: //
router.get('/add-page', function(req, res){
    let errors = [];
    let title = "";
    let slug = "";
    let content = "";

    // res.send('add page page admin');

    res.render('admin/add_page', {
        errors,
        title,
        slug,
        content
    });
});
 
// POST add page: //
router.post('/add-page', function(req, res){

        // validation
        req.checkBody("title", "title is required").notEmpty();
        req.checkBody("content", "content is required").notEmpty();

        let title = req.body.title;
        let slug = req.body.slug
            .replace(/\s+/g, "-")
            .toLowerCase();
        if (slug == "") slug = title
            .replace(/\s+/g, "-")
            .toLowerCase();
        let content = req.body.content;
        
        let errors = req.validationErrors();

        if (errors) {
            console.log("some errors", errors);
            res.render('admin/add_page', {
                errors,
                title,
                slug,
                content
            });
        } else {
            Page.findOne({slug: slug}, function(err, page){
                if(err) throw err;
                if(page){
                    req.flash('danger', 'Page slug taken, choose anotherone');
                    res.render('admin/add_page', {
                        title,
                        slug,
                        content
                    });
                } else {
                    const newPage = new Page({
                        title,
                        slug,
                        content,
                        sorting: 100
                    });

                    newPage.save(function(err){
                        if(err) return console.log("page save error: ",err);
                        req.flash('success', 'PAge Added');
                        res.redirect('/admin/pages');
                    });
                }
            })

        } // end of else
}); // end of POST ..add_page



module.exports = router;
