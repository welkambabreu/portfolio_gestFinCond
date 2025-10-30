const { revenues } = require('../database/inMemoryDb');

function createRevenue(revenue) {
  revenues.push(revenue);
  return revenue;
}

function updateRevenue(id, updates) {
  const revenue = revenues.find(r => r.id === id);
  if (!revenue) return null;
  Object.assign(revenue, updates);
  return revenue;
}

function findRevenueByApartment(apartamento) {
  return revenues.filter(r => r.apartamento == apartamento);
}

function getRevenueById(id) {
  return revenues.find(r => r.id === id);
}

module.exports = {
  createRevenue,
  updateRevenue,
  findRevenueByApartment,
  getRevenueById,
};
