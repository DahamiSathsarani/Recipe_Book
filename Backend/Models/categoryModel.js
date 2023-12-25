const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category_id: {
        type: Number,
        unique: true,
        required: true,
    },
    category_name: {
        type: String,
        required: true
    },
  });

const Categories = mongoose.model('Categories', CategorySchema);

module.exports = Categories;