const routerx = require('express-promise-router');
const userController = require('../controllers/user.');
const auth = require('../middlewares/auth');

const router = routerx();

router.post('/store', auth.verifyAdministrator, userController.store);
router.get('/show', auth.verifyAdministrator, userController.show);
router.get('/', auth.verifyAdministrator, userController.index);
router.put('/update', auth.verifyAdministrator, userController.update);
router.delete('/destory', auth.verifyAdministrator, userController.destory);
router.put('/activate', auth.verifyAdministrator, userController.activate);
router.put('/deactivate', auth.verifyAdministrator, userController.deactivate);
router.post('/login', userController.login);

module.exports = router;
