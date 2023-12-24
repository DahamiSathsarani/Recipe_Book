const mongoose = require('mongoose');

const MappingSchema = new mongoose.Schema({
    mapping_id: {
        type: String,
        required: true
    },
    recipe_id: {
        type: String,
        required: true
    },
    ingredient_id: {
        type: String,
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