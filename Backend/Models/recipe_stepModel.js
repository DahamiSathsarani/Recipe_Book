const mongoose = require('mongoose');

const Recipe_Step_Schema = new mongoose.Schema({
    mapping_id: {
        type: String,
        required: true
    },
    recipe_id: {
        type: String,
        required: true
    },
    step_id: {
        type: String,
        required: true
    },
  });

const Recipe_Steps = mongoose.model('Recipe_Steps', Recipe_Step_Schema);

module.exports = Recipe_Steps;