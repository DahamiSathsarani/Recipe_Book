const mongoose = require('mongoose');

const MappingSchema = new mongoose.Schema({
    mapping_id: {
        type: Number,
        required: true
    },
    recipe_id: {
        type: Number,
        required: true
    },
    ingredient_id: {
        type: Number,
        required: true
    },
    quantity: {
        type: String
    },
    unit: {
        type: String
    }
  });

const Recipe_Ingredients = mongoose.model('Recipe_Ingredients', MappingSchema);

module.exports = Recipe_Ingredients;