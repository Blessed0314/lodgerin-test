const { Router } = require('express');
const createUserController = require('../controllers/admin/createUserController');
const getUsersController = require('../controllers/admin/getUsersController');
const getUserController = require('../controllers/common/getUserController');
const updateUserController = require('../controllers/common/updateUserController');

const adminRouter = Router();

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Retrieve a list of users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 */
adminRouter.get('/users', getUsersController);

/**
 * @swagger
 * /admin/user/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A single user
 */
adminRouter.get('/user/:id', getUserController);

/**
 * @swagger
 * /admin/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     security:
 *       - bearerAuth: []
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
 *               password:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Role ID
 *     responses:
 *       200:
 *         description: User updated
 */
adminRouter.put('/user/:id', updateUserController);

/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary: Create a new user
 *     security:
 *       - bearerAuth: []
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
 *               password:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Role ID
 *     responses:
 *       201:
 *         description: User created
 */
adminRouter.post('/create', createUserController);

adminRouter.use((req, res, next) => {
    res.status(404).send('Error 404: this route does not exist');
});

module.exports = adminRouter;