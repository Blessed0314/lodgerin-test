const { Router } = require('express');
const createUserController = require('../controllers/admin/createUserController');
const getUsersController = require('../controllers/admin/getUsersController');
const getUserController = require('../controllers/admin/getUserController');
const updateUserController = require('../controllers/admin/updateUserController');

const adminRouter = Router();


adminRouter.get('/users', getUsersController);

adminRouter.get('/user/:id', getUserController);

adminRouter.put('/user/:id', updateUserController);

adminRouter.post('/create', createUserController);

module.exports = adminRouter;