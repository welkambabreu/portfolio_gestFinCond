const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/register', expenseController.register); // admin
router.put('/:id', expenseController.update); // admin
router.get('/search', expenseController.search); // todos

module.exports = router;
