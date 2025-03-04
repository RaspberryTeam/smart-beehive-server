const express = require('express');

module.exports = (apiaryController, authMiddleware) => {
    const router = express.Router();
    router.use(authMiddleware);

    router.post('/', (req, res, next) => apiaryController.create(req, res, next));

    router.get('/', (req, res, next) => apiaryController.getApiaries(req, res, next))
    router.get('/:apiaryId', (req, res, next) => apiaryController.getApiaryDetails(req, res, next));

    return router;
};