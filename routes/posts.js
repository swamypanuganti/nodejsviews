const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.get('/', postsController.getAll);
router.get('/:id', postsController.getById);
router.post('/', postsController.createRecord);
router.put('/:id', postsController.updateRecord);
router.delete('/:id', postsController.deleteRecord);

module.exports = router;
