const { Schema } = require('mongoose');

const ExerciseSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    image: { type: String, required: false },
    name: { type: String, required: false },
    lvl: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: false
    },
    video: { type: String, required: false },
    techniqueSummary: { type: String, required: false },
    description: { type: String, required: false },
    categories:  [{type: Schema.Types.ObjectId, ref: 'Category', required: false}],
    category_id: { 
        type: Number,
        enum: [1, 2, 3, 4, 5, 6],
        required: false
    },
}, { timestamps: true });

module.exports = ExerciseSchema;
