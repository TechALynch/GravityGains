const { Schema } = require('mongoose');

const SkillSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    workoutID: [{ type: Schema.Types.ObjectId, ref: 'Workout', required: false }],
    name: { type: String },
    image: { type: String },
}, { timestamps: true });

module.exports = SkillSchema;

