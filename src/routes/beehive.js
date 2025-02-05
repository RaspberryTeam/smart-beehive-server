const express = require('express');

module.exports = (beehiveController, authMiddleware) => {
    const router = express.Router();
    router.post('/', authMiddleware, (req, res) => beehiveController.addBeehive(req, res));

    router.get('/:beehiveId', authMiddleware, (req, res) => beehiveController.getBeehiveById(req, res));

    return router;
};