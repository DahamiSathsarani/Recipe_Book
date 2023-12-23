const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipe_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imgUrl : {
        type : String,
        required : true
    },
    updated_date: {
        type: String,
        default: () => {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];
            return formattedDate;
          },
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
  });

const Recipes = mongoose.model('Recipes', RecipeSchema);

module.exports = Recipes;