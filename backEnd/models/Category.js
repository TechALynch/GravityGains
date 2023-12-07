const { Schema } = require('mongoose');

const CategorySchema = new Schema({
    category_id: { type: Number },
    image: { type: String },
    name: { type: String },
    description: { type: String },
}, { timestamps: true });

module.exports = CategorySchema;