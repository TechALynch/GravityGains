const { Schema } = require('mongoose');

const ExerciseSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    image: { type: String },
    name: { type: String },
    lvl: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    video: { type: String },
    techniqueSummary: { type: String },
    description: { type: String },
    categories:  [{type: Schema.Types.ObjectId, ref: 'Category', required: true}],
}, { timestamps: true });

module.exports = ExerciseSchema;
