const { Schema } = require('mongoose');

const UserSchema = new Schema({
    auth0Id: { type: String, required: false},
    userName: { type: String },
    email: { type: String },
    fName: { type: String },
    lName: { type: String },
}, { timestamps: true });

module.exports = UserSchema;
