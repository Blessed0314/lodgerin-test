const { Router } = require('express');

const adminRouter = Router();

// Definir las subrutas
adminRouter.get('/users', (req, res) => {
  res.send('Admin Dashboard');
});

adminRouter.get('/user/:id', (req, res) => {
  res.send('Admin Settings');
});

adminRouter.put('/user/:id', (req, res) => {
  res.send('Admin Settings');
});

adminRouter.post('/create', (req, res) => {
  res.send('Admin Settings');
});

module.exports = adminRouter;