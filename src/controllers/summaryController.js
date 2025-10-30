const summaryService = require('../services/summaryService');

exports.create = (req, res) => {
  const { month, previousBalance } = req.body;
  if (!month || previousBalance === undefined) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }
  const summary = summaryService.calculateSummary(month, Number(previousBalance));
  summaryService.createSummary(summary);
  res.status(201).json(summary);
};

exports.get = (req, res) => {
  const { month } = req.query;
  if (!month) return res.status(400).json({ error: 'Mês não informado.' });
  const summary = summaryService.getSummaryByMonth(month);
  if (!summary) return res.status(404).json({ error: 'Resumo não encontrado.' });
  res.json(summary);
};