const expenseService = require('../services/expenseService');

exports.register = (req, res) => {
  const { id, despesa, valor, data } = req.body;
  if (!id || !despesa || valor === undefined || !data) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }
  const expense = expenseService.createExpense({ id, despesa, valor, data });
  res.status(201).json(expense);
};

exports.update = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const expense = expenseService.updateExpense(id, updates);
  if (!expense) return res.status(404).json({ error: 'Despesa não encontrada.' });
  res.json(expense);
};

exports.search = (req, res) => {
  const { name } = req.query;
  const result = expenseService.findExpenseByName(name || '');
  res.json(result);
};