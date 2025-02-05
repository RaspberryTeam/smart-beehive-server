const express = require('express');

module.exports = (userController) => {
    const router = express.Router();
    router.post('/', (req, res) => userController.register(req, res));
    router.post('/login', (req, res) => userController.login(req, res));
    return router;
};