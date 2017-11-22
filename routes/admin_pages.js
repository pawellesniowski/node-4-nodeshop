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
                        req.flash('success', 'Page added');
                        res.redirect('/admin/pages');
                    });
                }
            })

        } // end of else
}); // end of POST ..add_page

// GET edit_page: //
router.get('/edit-page/:slug', function(req, res){

    Page.findOne({slug: req.params.slug}, function(err, page){
        if(err) return console.log('err from edit_page: ', err);
        res.render('admin/edit_page', {
            title: page.title,
            slug: page.slug,
            content: page.content,
            sorting: page.sorting,
            id: page._id
        });
    });

}); // end of GET edit-page //

// POST edit-page: //
router.post('/edit-page/:slug', function(req, res){

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
        let id = req.body.id; 
        let sorting = req.body.sorting;
        
        let errors = req.validationErrors();

        if (errors) {
            console.log("some errors", errors);
            res.render('admin/edit_page', {
                errors,
                title,
                slug,
                content,
                sorting,
                id        
            });
        } else {
            Page.findOne({slug: slug, _id:{'$ne':id}}, function(err, page){
                if(err) console.log("Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                if(page){
                    if (err) console.log("Here22222222222222222222222222");
                    req.flash('danger', 'Page slug taken, choose anotherone');
                    res.render('admin/edit_page', {
                        title,
                        slug,
                        content,
                        sorting,
                        id,
                    });
                } else {
                    Page.findById(id, function(err, page){
                        if (err) return console.log("page save error: ", err);
                        page.title = title;
                        page.slug = slug;
                        page.content = content;
                        page.sorting = sorting;

                        page.save(function(err){
                            if(err) return console.log("page save error: ",err);
                            req.flash('success', 'Page Added');
                            res.redirect('/admin/pages');
                        });

                    });

                    
                }
            }); // end of pageFind

        } // end of else

}); // end of POST edit-page //

// GET delete_page: //
router.get('/delete-page/:id', function(req, res){
    Page.findByIdAndRemove(req.params.id, function(err){
        if(err) return console.log('err');
        req.flash('success', 'Page deleted!');
        res.redirect('/admin/pages/');
    });
});


module.exports = router;
