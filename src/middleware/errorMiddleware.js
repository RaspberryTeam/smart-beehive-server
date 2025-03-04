const MESSAGES = require("../constants/messages");

module.exports = (err, req, res, next) => {
    console.error(err);

    if (err.statusCode) {
        return res.status(err.statusCode).json({ error: err.message });
    };

    return res.status(500).json({ error: MESSAGES.ERRORS.INTERNAL_SERVER });
};