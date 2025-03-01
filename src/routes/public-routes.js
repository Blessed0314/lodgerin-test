const { Router } = require('express');

const publicRouter = Router();

publicRouter.post('/login', (req, res) => {
    res.send('Login');
});

publicRouter.post('/register', (req, res) => {
    res.send('Register');
});

publicRouter.get('/user/:id', (req, res) => {
    res.send('user details');
});

publicRouter.put('/user/:id', (req, res) => {
    res.send('update details');
});

publicRouter.patch('/user/:id', (req, res) => {
    res.send('update password');
});

publicRouter.post('/logout', (req, res) => {
    res.send('logout');
});

module.exports = publicRouter;