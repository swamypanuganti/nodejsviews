const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

console.log('in users router');
router.get('/', usersController.getAll);
router.get('/list', usersController.getAllUsers);
router.get('/:id', usersController.getById);
// router.get('/gotocreate', usersController.gotocreate);
router.get('/gotoedit/:id', usersController.gotoedit);
router.post('/create/', usersController.createRecord);
router.post('/', usersController.createRecord);
router.post('/login', usersController.login);
router.put('/:id', usersController.updateRecord);
router.put('/update/:id', usersController.updateRecordFromForm);
router.delete('/:id', usersController.deleteRecord);

module.exports = router;
