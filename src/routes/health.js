const express = require('express');

module.exports = (healthCeckController) => {
    const router = express.Router();
    router.get('/', (req, res) => healthCeckController.healthCheck(req, res));
    return router;
};