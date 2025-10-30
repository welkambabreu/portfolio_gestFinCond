const { users } = require('../database/inMemoryDb');

function createUser(user) {
  const { id, nome, email, senha, isAdmin, isActive } = user;
  if (!id || !nome || !email || !senha || isAdmin === undefined || isActive === undefined) {
    throw new Error('Campos obrigatórios ausentes.');
  }
  users.push({ id, nome, email, senha, isAdmin, isActive });
  return user;
}

function updateUser(id, updates) {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  Object.assign(user, updates);
  return user;
}

function findUserByNameOrEmail(query) {
  return users.filter(u => u.nome.includes(query) || u.email.includes(query));
}

function getUserById(id) {
  return users.find(u => u.id === id);
}

function getUserByEmail(email) {
  return users.find(u => u.email === email);
}

module.exports = {
  createUser,
  updateUser,
  findUserByNameOrEmail,
  getUserById,
  getUserByEmail,
};
