const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const adminRouter = require('./admin-routes.js');
const publicRouter = require('./public-routes.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/admin', adminRouter)
router.use('/public', publicRouter)

module.exports = router;