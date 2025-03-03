const { Router } = require('express');

const { userMiddleware, adminMiddleware } = require('../middleware/roleMiddleware');

const loginController = require('../controllers/common/loginController');
const registerController = require('../controllers/common/registerController');

const adminRouter = require('./admin-routes.js');
const publicRouter = require('./public-routes.js');

const router = Router();

router.use('/login', loginController);
router.use('/register', registerController);
router.use('/admin', adminMiddleware, adminRouter)
router.use('/public', userMiddleware, publicRouter)

module.exports = router;