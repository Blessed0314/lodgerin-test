const { Router } = require('express');
const { isGuestUserMiddleware, updateGuestUserMiddleware } = require('../middleware/guestUserMiddleware');
const getUserController = require('../controllers/common/getUserController');
const updateUserController = require('../controllers/common/updateUserController');
const updatePasswordController = require('../controllers/public/updatePasswordController');

const publicRouter = Router();

/**
 * @swagger
 * /public/user/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 */
publicRouter.get('/user/:id', isGuestUserMiddleware, getUserController);

/**
 * @swagger
 * /public/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */
publicRouter.put('/user/:id', isGuestUserMiddleware, updateGuestUserMiddleware, updateUserController);

/**
 * @swagger
 * /public/user/{id}:
 *   patch:
 *     summary: Update a user's password by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 */
publicRouter.patch('/user/:id', isGuestUserMiddleware, updatePasswordController);

publicRouter.use((req, res, next) => {
    res.status(404).send('Error 404: this route does not exist');
});

module.exports = publicRouter;