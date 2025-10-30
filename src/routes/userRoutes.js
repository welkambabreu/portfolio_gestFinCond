const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register); // sem token
router.put('/:id', userController.update); // admin
router.get('/search', userController.search); // todos

module.exports = router;
