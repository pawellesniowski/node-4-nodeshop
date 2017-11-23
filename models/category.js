const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    title: {
        type: String,
        require: true
    },
    slug: {
        type: String
    }
});

// creating models:
const Category = module.exports = mongoose.model('Category', categorySchema);