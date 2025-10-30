const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');


router.post('/register', revenueController.register); // admin
router.put('/:id', revenueController.update); // admin
router.get('/search', revenueController.search); // todos (consulta por apartamento)

module.exports = router;
