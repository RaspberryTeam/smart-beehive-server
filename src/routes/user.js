const express = require('express');

module.exports = (userController) => {
    const router = express.Router();
    router.post('/', (req, res, next) => userController.register(req, res, next));
    router.post('/login', (req, res, next) => userController.login(req, res, next));
    return router;
};