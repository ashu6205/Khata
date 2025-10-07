const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

// All transaction routes require authentication
router.use(authMiddleware);

// Transaction CRUD routes
router.get('/', transactionController.getTransactions);
router.post('/', transactionController.createTransaction);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

// Bulk operations
router.post('/bulk', transactionController.bulkCreateTransactions);

// Statistics
router.get('/statistics', transactionController.getStatistics);

module.exports = router;
