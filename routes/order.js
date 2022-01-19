const routerx = require('express-promise-router');

const orderController = require('../controllers/order');
const auth = require('../middlewares/auth');

const router = routerx();

router.get('/', auth.verifyVendedor, orderController.index);
router.post('/store', auth.verifyVendedor, orderController.store);
router.get('/show', auth.verifyVendedor, orderController.show);

router.put('/activate', auth.verifyVendedor, orderController.activate);
router.put('/deactivate', auth.verifyVendedor, orderController.deactivate);

module.exports = router;
