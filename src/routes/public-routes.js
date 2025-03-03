const { Router } = require('express');
const { isGuestUserMiddleware, updateGuestUserMiddleware } = require('../middleware/guestUserMiddleware');
const { getUser, updateUser } = require('../services/user-service');

const publicRouter = Router();

publicRouter.get('/user/:id', isGuestUserMiddleware, getUser);

publicRouter.put('/user/:id', isGuestUserMiddleware, updateGuestUserMiddleware, updateUser);

publicRouter.patch('/user/:id', isGuestUserMiddleware, (req, res) => {
    res.send('update password');
});

publicRouter.use((req, res, next) => {
    res.status(404).send('Error 404: this route does not exist');
});

module.exports = publicRouter;