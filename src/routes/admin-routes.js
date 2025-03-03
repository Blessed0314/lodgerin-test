const { Router } = require('express');
const createUserController = require('../controllers/admin/createUserController');
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

adminRouter.post('/create', createUserController);

module.exports = adminRouter;