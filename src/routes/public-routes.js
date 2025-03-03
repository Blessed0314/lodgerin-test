const { Router } = require('express');
const { isUser } = require('../middleware/userMiddleware');

const publicRouter = Router();

publicRouter.get('/user/:id', isUser, (req, res) => {
    res.send('user details');
});

publicRouter.put('/user/:id', isUser, (req, res) => {
    res.send('update details');
});

publicRouter.patch('/user/:id', isUser, (req, res) => {
    res.send('update password');
});

module.exports = publicRouter;