const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.post('/create', controllers.author.create);
router.get('/get', controllers.author.getAll);
router.get('/:id', controllers.author.get);
router.delete('/:id', controllers.author.remove);
router.put('/:id', controllers.author.update);

module.exports = router;
