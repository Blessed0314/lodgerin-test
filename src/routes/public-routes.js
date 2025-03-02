const { Router } = require('express');

const publicRouter = Router();

publicRouter.get('/user/:id', (req, res) => {
    res.send('user details');
});

publicRouter.put('/user/:id', (req, res) => {
    res.send('update details');
});

publicRouter.patch('/user/:id', (req, res) => {
    res.send('update password');
});

module.exports = publicRouter;