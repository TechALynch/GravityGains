const { Schema } = require('mongoose');

const ExerciseSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    image: { type: String },
    name: { type: String },
    lvl: { type: Date },
    video: { type: Date },
    techniqueSummary: { type: String },
    description: { type: String },
    categories: { type: String },
}, { timestamps: true });

module.exports = ExerciseSchema;



