const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// List of all blackListed Tokens
const tokenBlacklist = new Set();

// Generate token
function generateToken(username, userID) {
    const secretKey = process.env.SECRET_KEY;
    return jwt.sign({ username, userID }, secretKey, { expiresIn: '365d' });
}


// Middleware to verify token
function authenticateToken(req, res, next) {
    const secretKey = process.env.SECRET_KEY;
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401);
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please log in again.' });
            }
            return res.status(403);
        }
        req.user = user;
        next();
    });
}

function isTokenBlacklisted(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401);
    }
    if (tokenBlacklist.has(token)) {
        return res.json({ message: "User Logged out!! Login again" })
    }
    next();
}
module.exports = { generateToken, authenticateToken, isTokenBlacklisted, tokenBlacklist }