const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
});

const Product = module.exports = mongoose.model('Product', productSchema);

// after creating this model, we install dependencies:
// npm i --save express-fileupload fs-extra mkdirp resize-img