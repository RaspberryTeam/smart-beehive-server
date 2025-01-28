const Router = require('express');
const router = new Router();

const beehiveController = require('./beehive');
const userController = require('./user');
const apiaryController = require('./apiary');

router.use('/beehives', beehiveController);
router.use('/users', userController);
router.use('/apiarys', apiaryController);

module.exports = router;    