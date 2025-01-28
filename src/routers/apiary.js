const Router = require('express');
const router = new Router();

const apiaryController = require('../controllers/apiaryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, apiaryController.create);

router.get('/', authMiddleware, apiaryController.getApirays);
router.get('/details/:apiaryId', authMiddleware, apiaryController.getApiaryDetails);

module.exports = router;