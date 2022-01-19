const routerx = require('express-promise-router');
const CartController = require('../controllers/cart');
const auth = require('../middlewares/auth');

const router = routerx();

router.get('/', auth.verifyStorekeeper, CartController.index);
router.get('/show', auth.verifyStorekeeper, CartController.show);
router.post('/store', auth.verifyStorekeeper, CartController.store);

router.put('/activate', auth.verifyStorekeeper, CartController.activate);
router.put('/deactivate', auth.verifyStorekeeper, CartController.deactivate);

export default router;
