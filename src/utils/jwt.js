
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJwt = (id, phonenumber) => {
    return jwt.sign(
        { id, phonenumber },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = { generateJwt, verifyToken };