const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: String,
    photoPath: String,
    description: String
});

const modelShema = mongoose.model('Pages', shema);

module.exports = modelShema()

