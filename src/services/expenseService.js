const { expenses } = require('../database/inMemoryDb');

function createExpense(expense) {
  expenses.push(expense);
  return expense;
}

function updateExpense(id, updates) {
  const expense = expenses.find(e => e.id === id);
  if (!expense) return null;
  Object.assign(expense, updates);
  return expense;
}

function findExpenseByName(name) {
  return expenses.filter(e => e.despesa.includes(name));
}

function getExpenseById(id) {
  return expenses.find(e => e.id === id);
}

module.exports = {
  createExpense,
  updateExpense,
  findExpenseByName,
  getExpenseById,
};
