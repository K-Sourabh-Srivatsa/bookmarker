const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Users = require('../models/users');
const Bookmarks = require('../models/bookmarks');
const Tags = require('../models/tags');

const { createTokenForUser } = require('../services/authentication');

async function handleUserRegister (req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;

        await Users.create({
            firstName,
            lastName,
            email,
            password
        });

        return res.status(200).json({ msg: 'Successfully registered the user: ', firstName});
    } catch (err) {
        return res.status(500).json({ err: 'Error while registering the user' });
    }
};

async function handleUserLogin (req, res) {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });
        if(!user) return res.status(401).json({ msg: 'Invalid email or password' });

        const isPasswordValid = bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(401).json({ msg: 'Invalid email or password' });

        const token = createTokenForUser(user);
        res.status(200).json({
            msg: 'Login successful',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(500).json({ msg: 'Error while logging in the user' });
    }
}

async function handleUserDelete (req, res) {
    try {
        const user = await Users.findById(req.params.id);
        if(!user) return res.status(404).json({ err: 'User not found' });

        await Bookmarks.deleteMany({ createdBy: req.params.id });
        await Tags.deleteMany({ createdBy: req.params.id });
        await Users.findByIdAndDelete(req.params.id);
        
        return res.status(200).json({ msg: 'User and user data deleted successfully' });

    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error'});
    }
}

async function handleUserUpdate (req, res) {
    const body = req.body;
    try {
        const user = await Users.findById(req.params.id);
        if(!user) return res.status(404).json({ err: 'User does not exist' });

        const updatedUser = await Users.findByIdAndUpdate(req.params.id, body);
        return res.status(200).json({ msg: 'User details updated successfully' });

    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error'});
    }
}

module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleUserDelete,
    handleUserUpdate,
};