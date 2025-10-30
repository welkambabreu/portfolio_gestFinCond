const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');

router.post('/create', summaryController.create); // admin
router.get('/', summaryController.get); // todos

module.exports = router;
