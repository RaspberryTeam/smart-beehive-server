const Router = require('express');
const router = new Router();

const userController = require('../controllers/userController');

router.post('/', userController.register);
router.post('/login', userController.login);

module.exports = router;