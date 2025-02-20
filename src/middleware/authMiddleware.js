const { verifyToken } = require("../utils/jwt");

module.exports = function (req, res, next) {
    
    if (req.method === "OPTIONS") {
        next()
    };

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No auth" });
        };

        const decoded = verifyToken(token);

        if(!decoded) {
            return res.status(401).json({ message: "No auth" });
        };

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "No auth" });
    };
};