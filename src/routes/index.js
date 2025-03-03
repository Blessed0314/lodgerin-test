const { Router } = require('express');

const { userMiddleware, adminMiddleware, isRevokedMiddleware } = require('../middleware/roleMiddleware');

const loginController = require('../controllers/public/loginController');
const registerController = require('../controllers/public/registerController');
const logoutController = require('../controllers/common/logoutController');

const adminRouter = require('./admin-routes.js');
const publicRouter = require('./public-routes.js');

const router = Router();

router.use('/login', loginController);
router.use('/logout', logoutController);
router.use('/register', registerController);
router.use('/admin', isRevokedMiddleware, adminMiddleware, adminRouter);
router.use('/public', isRevokedMiddleware, userMiddleware, publicRouter);

router.use((req, res, next) => {
    res.status(404).send('Error 404: this route does not exist');
});

module.exports = router;