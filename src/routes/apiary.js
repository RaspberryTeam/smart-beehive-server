const express = require('express');

module.exports = (apiaryController, authMiddleware) => {
    const router = express.Router();

    router.post('/', authMiddleware, (req, res) => apiaryController.create(req, res));

    router.get('/', authMiddleware, (req, res) => apiaryController.getApiaries(req, res))
    router.get('/:apiaryId', authMiddleware, (req, res) => apiaryController.getApiaryDetails(req, res));

    return router;
};