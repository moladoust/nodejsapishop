const express = require("express");
const routerx = require("express-promise-router");

const ArticleController = require("../controllers/article");

const router = routerx();

router.get('/', ArticleController.index);
router.get('/:id', ArticleController.show);
router.get('/:code/code', ArticleController.showByCode);
router.post('/store', ArticleController.store);
router.put('/:id/update', ArticleController.update);
router.delete('/:id/destroy', ArticleController.destroy);
router.put('/:id/activate', ArticleController.activate);
router.put('/:id/deactivate', ArticleController.deactivate);

module.exports = router;

