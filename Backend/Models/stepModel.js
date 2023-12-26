const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
    step_id: {
        type: Number,
        required: true
    },
    step: {
        type: String,
        required: true
    },
  });

const Steps = mongoose.model('Steps', StepSchema);

module.exports = Steps;