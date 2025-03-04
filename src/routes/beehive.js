const express = require('express');

module.exports = (beehiveController, authMiddleware) => {
    const router = express.Router();
    router.use(authMiddleware);

    router.post('/', (req, res, next) => beehiveController.addBeehive(req, res, next));

    router.get('/:beehiveId', (req, res, next) => beehiveController.getBeehiveById(req, res, next));

    return router;
};