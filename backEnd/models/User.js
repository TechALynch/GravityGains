const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    authenticationId: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    fName: { type: String },
    lName: { type: String },
}, { timestamps: true });

// Hash the password before saving it to the database
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = UserSchema;
