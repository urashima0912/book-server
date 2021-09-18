const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.post('/create', controllers.book.create);
router.get('/get', controllers.book.getAll);
router.get('/:id', controllers.book.get);
router.delete('/:id', controllers.book.remove);
router.put('/:id', controllers.book.update);

module.exports = router;
