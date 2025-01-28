const Router = require('express');
const router = new Router();

const beehiveController = require('../controllers/beehiveController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, beehiveController.addBeehive);

router.get('/get-details/:beehiveId', authMiddleware, beehiveController.getBeehiveById);

module.exports = router;