const { Router } = require('express');
const { isGuestUserMiddleware, updateGuestUserMiddleware } = require('../middleware/guestUserMiddleware');
const getUserController = require('../controllers/common/getUserController');
const updateUserController = require('../controllers/common/updateUserController');
const updatePasswordController = require('../controllers/public/updatePasswordController');

const publicRouter = Router();

publicRouter.get('/user/:id', isGuestUserMiddleware, getUserController);

publicRouter.put('/user/:id', isGuestUserMiddleware, updateGuestUserMiddleware, updateUserController);

publicRouter.patch('/user/:id', isGuestUserMiddleware, updatePasswordController);

publicRouter.use((req, res, next) => {
    res.status(404).send('Error 404: this route does not exist');
});

module.exports = publicRouter;