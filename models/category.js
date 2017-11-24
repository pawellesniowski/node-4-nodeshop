const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    title: {
        type: String,
        require: true
    },
    sorting: {
        type: Number
    }
});

// creating models:
const Category = module.exports = mongoose.model('Category', categorySchema);