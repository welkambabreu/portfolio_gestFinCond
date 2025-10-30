const revenueService = require('../services/revenueService');

exports.register = (req, res) => {
  const { id, apartamento, cotaCondominial, cotaExtra, cotasVencidasAReceber, data } = req.body;
  if (!id || apartamento === undefined || cotaCondominial === undefined || cotaExtra === undefined || cotasVencidasAReceber === undefined || !data) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }
  const revenue = revenueService.createRevenue({ id, apartamento, cotaCondominial, cotaExtra, cotasVencidasAReceber, data });
  res.status(201).json(revenue);
};

exports.update = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const revenue = revenueService.updateRevenue(id, updates);
  if (!revenue) return res.status(404).json({ error: 'Receita não encontrada.' });
  res.json(revenue);
};

exports.search = (req, res) => {
  const { apartamento } = req.query;
  if (apartamento === undefined) return res.status(400).json({ error: 'Apartamento não informado.' });
  const result = revenueService.findRevenueByApartment(apartamento);
  res.json(result);
};