const Transaction = require('../models/transactionSchema');
const mongoose = require('mongoose');

// Get all transactions for the logged-in user
const getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, startDate, endDate, month, year } = req.query;
    
    // Build filter object
    const filter = { userId: req.userId };
    
    // Filter by type
    if (type && ['income', 'expense'].includes(type)) {
      filter.type = type;
    }
    
    // Filter by category
    if (category) {
      filter.category = category;
    }
    
    // Date filtering
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else if (month && year) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0);
      filter.date = {
        $gte: startOfMonth,
        $lte: endOfMonth
      };
    } else if (year) {
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31);
      filter.date = {
        $gte: startOfYear,
        $lte: endOfYear
      };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get transactions with pagination
    const transactions = await Transaction.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const totalTransactions = await Transaction.countDocuments(filter);
    const totalPages = Math.ceil(totalTransactions / parseInt(limit));

    res.json({
      success: true,
      data: {
        transactions,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalTransactions,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching transactions'
    });
  }
};

// Create new transaction
const createTransaction = async (req, res) => {
  try {
    const { date, description, category, type, amount } = req.body;

    // Validation
    if (!description || !category || !type || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: description, category, type, amount'
      });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be either "income" or "expense"'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    // Create transaction
    const transaction = new Transaction({
      userId: req.userId,
      date: date ? new Date(date) : new Date(),
      description: description.trim(),
      category,
      type,
      amount: parseFloat(amount)
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: { transaction }
    });

  } catch (error) {
    console.error('Create transaction error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating transaction'
    });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, description, category, type, amount } = req.body;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction ID'
      });
    }

    // Find transaction
    const transaction = await Transaction.findOne({ _id: id, userId: req.userId });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    // Update fields
    if (date) transaction.date = new Date(date);
    if (description) transaction.description = description.trim();
    if (category) transaction.category = category;
    if (type && ['income', 'expense'].includes(type)) transaction.type = type;
    if (amount && amount > 0) transaction.amount = parseFloat(amount);

    await transaction.save();

    res.json({
      success: true,
      message: 'Transaction updated successfully',
      data: { transaction }
    });

  } catch (error) {
    console.error('Update transaction error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating transaction'
    });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction ID'
      });
    }

    // Find and delete transaction
    const transaction = await Transaction.findOneAndDelete({ _id: id, userId: req.userId });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      message: 'Transaction deleted successfully'
    });

  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting transaction'
    });
  }
};

// Bulk create transactions (for CSV upload)
const bulkCreateTransactions = async (req, res) => {
  try {
    const { transactions } = req.body;

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of transactions'
      });
    }

    // Add userId to each transaction
    const transactionsWithUser = transactions.map(transaction => ({
      ...transaction,
      userId: req.userId,
      date: transaction.date ? new Date(transaction.date) : new Date(),
      amount: parseFloat(transaction.amount)
    }));

    // Validate and create transactions
    const createdTransactions = await Transaction.insertMany(transactionsWithUser, {
      ordered: false // Continue inserting even if some fail
    });

    res.status(201).json({
      success: true,
      message: `${createdTransactions.length} transactions created successfully`,
      data: { transactions: createdTransactions }
    });

  } catch (error) {
    console.error('Bulk create transactions error:', error);
    
    if (error.name === 'BulkWriteError') {
      const successCount = error.result.insertedCount || 0;
      const failureCount = error.writeErrors?.length || 0;
      
      return res.status(207).json({
        success: true,
        message: `${successCount} transactions created, ${failureCount} failed`,
        data: {
          created: successCount,
          failed: failureCount,
          errors: error.writeErrors
        }
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating transactions'
    });
  }
};

// Get transaction statistics
const getStatistics = async (req, res) => {
  try {
    const { month, year } = req.query;
    
    // Build date filter
    let dateFilter = {};
    if (month && year) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0);
      dateFilter = {
        date: { $gte: startOfMonth, $lte: endOfMonth }
      };
    } else if (year) {
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31);
      dateFilter = {
        date: { $gte: startOfYear, $lte: endOfYear }
      };
    }

    // Aggregate statistics
    const stats = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.userId), ...dateFilter } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Format response
    const result = {
      totalIncome: 0,
      totalExpense: 0,
      incomeCount: 0,
      expenseCount: 0,
      netAmount: 0
    };

    stats.forEach(stat => {
      if (stat._id === 'income') {
        result.totalIncome = stat.total;
        result.incomeCount = stat.count;
      } else if (stat._id === 'expense') {
        result.totalExpense = stat.total;
        result.expenseCount = stat.count;
      }
    });

    result.netAmount = result.totalIncome - result.totalExpense;

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  bulkCreateTransactions,
  getStatistics
};
