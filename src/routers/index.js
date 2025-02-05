const express = require('express');

module.exports = (userController, apiaryController, beehiveController, authMiddleware) => {
    const router = express.Router();

    router.use('/users', require('./user')(userController));
    router.use('/apiaries', require('./apiary')(apiaryController, authMiddleware));
    router.use('/beehives', require('./beehive')(beehiveController, authMiddleware));

    return router;
};