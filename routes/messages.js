const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages');

router.get('/', messagesController.getAll);
router.get('/:id', messagesController.getById);
router.post('/', messagesController.createRecord);
router.put('/:id', messagesController.updateRecord);
router.delete('/:id', messagesController.deleteRecord);

module.exports = router;
