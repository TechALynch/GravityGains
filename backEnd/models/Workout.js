const { Schema } = require('mongoose');

const WorkoutSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    exerciseID:  [{type: Schema.Types.ObjectId, ref: 'Exercise', required: false}],
    name: { type: String },
    image: { type: String },
    lvl: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
}, { timestamps: true });

module.exports = WorkoutSchema;