const mongoose = require('mongoose');

const IngredientsSchema = new mongoose.Schema({
    ingredient_id: {
        type: Number,
        required: true
    },
    ingredient_name: {
        type: String,
        required: true
    },
  });

const Ingredients = mongoose.model('Ingredients', IngredientsSchema);

module.exports = Ingredients;