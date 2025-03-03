// filepath: /C:/Users/user/Documents/lodgerin-test/src/routes/index.js
const { Router } = require('express');

const { userMiddleware, adminMiddleware, isRevokedMiddleware } = require('../middleware/roleMiddleware');

const loginController = require('../controllers/public/loginController');
const registerController = require('../controllers/public/registerController');
const logoutController = require('../controllers/common/logoutController');

const adminRouter = require('./admin-routes.js');
const publicRouter = require('./public-routes.js');

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 */
router.post('/login', loginController);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful logout
 */
router.post('/logout', logoutController);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful registration
 */
router.post('/register', registerController);

router.use('/admin', isRevokedMiddleware, adminMiddleware, adminRouter);

router.use('/public', isRevokedMiddleware, userMiddleware, publicRouter);

router.use((req, res, next) => {
    res.status(404).send('Error 404: this route does not exist');
});

module.exports = router;