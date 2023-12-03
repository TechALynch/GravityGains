const { Schema } = require('mongoose');

const CategorySchema = new Schema({
    image: { type: String },
    name: { type: String },
    description: { type: String },
}, { timestamps: true });

module.exports = CategorySchema;