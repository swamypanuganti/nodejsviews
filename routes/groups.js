const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groups');

router.get('/', groupsController.getAll);
router.get('/list', groupsController.getAllgroups);
router.get('/:id', groupsController.getById);
router.post('/', groupsController.createRecord);
router.put('/:id', groupsController.updateRecord);
router.delete('/:id', groupsController.deleteRecord);

module.exports = router;
