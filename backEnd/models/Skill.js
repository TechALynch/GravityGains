const { Schema } = require('mongoose');

const SkillSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    exerciseID:  {type: Schema.Types.ObjectId, ref: 'Exercise', required: false},
    name: { type: String },
    image: { type: String },
    lvl: { type: String },
}, { timestamps: true });

module.exports = SkillSchema;