const express = require('express');
const jwt = require('jsonwebtoken');

const secret = 'onuethosncuh@1234234';

function createTokenForUser (user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, secret);
    return token;
}

function validateToken (token) {
    const payload = jwt.verify(token, secret);

    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}