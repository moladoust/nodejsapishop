const routerx = require('express-promise-router');
const personController = require('../controllers/person');
const auth = require('../middlewares/auth');
const router = routerx();

router.post('/store', auth.verifyUser, personController.store);
router.get('/show', auth.verifyUser, personController.show);
router.get('/', auth.verifyUser, personController.index);
router.get('/clientsList', auth.verifyUser, personController.clientsList);
router.get('/suppliers-list', auth.verifyUser, personController.suppliersList);
router.put('/update', auth.verifyUser, personController.update);
router.delete('/destroy', auth.verifyUser, personController.destroy);
router.put('/activate', auth.verifyUser, personController.activate);
router.put('/deactivate', auth.verifyUser, personController.deactivate);

module.exports = router;
