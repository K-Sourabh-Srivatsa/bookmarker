const { validateToken } = require('../services/authentication');

function checkForAuthentication (req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    const userPayload = validateToken(token);
    if (!userPayload) return res.status(401).json({ msg: 'Token is not Payload' });

    req.user = userPayload;
    next();
};

module.exports = checkForAuthentication;