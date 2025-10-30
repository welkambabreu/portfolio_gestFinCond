const { summaries, expenses, revenues } = require('../database/inMemoryDb');

function createSummary(summary) {
  summaries.push(summary);
  return summary;
}

function getSummaryByMonth(month) {
  return summaries.find(s => s.month === month);
}

function calculateSummary(month, previousBalance) {
  const monthExpenses = expenses.filter(e => e.data.startsWith(month));
  const monthRevenues = revenues.filter(r => r.data.startsWith(month));

  const totalDespesas = monthExpenses.reduce((acc, e) => acc + Number(e.valor), 0);
  const totalReceita = monthRevenues.reduce((acc, r) => acc + Number(r.cotaCondominial) + Number(r.cotaExtra) + Number(r.cotasVencidasAReceber), 0);

  const receitasRealizadas = totalReceita;
  const despesasRealizadas = totalDespesas;
  const saldoAtual = previousBalance + receitasRealizadas - despesasRealizadas;
  const totalEmCaixa = saldoAtual;

  return {
    month,
    receitasRealizadas,
    despesasRealizadas,
    saldoAtual,
    totalEmCaixa,
    previousBalance,
  };
}

module.exports = {
  createSummary,
  getSummaryByMonth,
  calculateSummary,
};
