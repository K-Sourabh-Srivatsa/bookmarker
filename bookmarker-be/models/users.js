const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

usersSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    try {
        const user = this;

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(this.password, salt);

        this.password = encryptedPassword;
        next();
    } catch (err) {
        return next(err);
    }
})

usersSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    const user = await this.findOne({ email });
    if(!user) throw new Error('User not found');
});
const Users = new mongoose.model('users', usersSchema);

module.exports = Users;