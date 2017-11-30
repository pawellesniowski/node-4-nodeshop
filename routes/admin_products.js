const express = require('express');
const router = express.Router();
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const resizeImg = require('resize-img');
// get Product model:
const Product = require('../models/product');
// get Category model:
const Category = require('../models/category');

//- routes -//

// GET for products //
router.get('/', function(req, res){

    let count;
    Product.count(function(err, c){
        if(err) return console.log('err from admin_products, get /, count: ', err);
        count = c;
    });

    Product.find(function(err, products){
        if(err) return console.log('err form admin_products, get /, Product.find: ', err);
        res.render('admin/products', {
                products,
                count
        });
    });
}); // end of GET for products //

// GET for add-product //
router.get('/add-product', function(req, res){
    // res.send('add product test');
    res.render('admin/add_product');
});



module.exports = router;

