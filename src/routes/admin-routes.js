const { Router } = require('express');
const createUserController = require('../controllers/admin/createUserController');
const getUsersController = require('../controllers/admin/getUsersController');
const getUserController = require('../controllers/common/getUserController');
const updateUserController = require('../controllers/common/updateUserController');

const adminRouter = Router();


adminRouter.get('/users', getUsersController);

adminRouter.get('/user/:id', getUserController);

adminRouter.put('/user/:id', updateUserController);

adminRouter.post('/create', createUserController);

adminRouter.use((req, res, next) => {
    res.status(404).send('Error 404: this route does not exist');
});

module.exports = adminRouter;