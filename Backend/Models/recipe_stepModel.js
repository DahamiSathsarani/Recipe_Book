const mongoose = require('mongoose');

const Recipe_Step_Schema = new mongoose.Schema({
    mapping_id: {
        type: Number,
        required: true
    },
    recipe_id: {
        type: Number,
        required: true
    },
    step_id: {
        type: Number,
        required: true
    },
  });

const Recipe_Steps = mongoose.model('Recipe_Steps', Recipe_Step_Schema);

module.exports = Recipe_Steps;