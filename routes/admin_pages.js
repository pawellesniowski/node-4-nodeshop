const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");


// GET pages index: //
router.get('/pages', function(req, res){
    res.render('admin', {
        title: "admin panel area"
    });
});

// GET add page: //
router.get('/pages/add-page', function(req, res){
    let title = "";
    let slug = "";
    let content = "";

    // res.send('add page page admin');

    res.render('admin/add_page', {
        title,
        slug,
        content
    });
});
 
// POST add page: //
router.post('/pages/add-page', function(req, res){

          [// General error messages can be given as a 2nd argument in the check APIs
            check("title", "passwords must be at least 1 chars long and contain one number").isLength(
              { min: 1 }
            )], (req, res, next) => {
              // Get the validation result whenever you want; see the Validation Result API for all options!
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                return res
                  .status(422)
                  .json({ errors: errors.mapped() });
              }
            };

        let title = req.body.title;
        let slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
        if(slug == "") slug = title.replace(/\s+/g, "-").toLowerCase();
        let content = req.body.content;

});



module.exports = router;
