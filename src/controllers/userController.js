const userService = require('../services/userService');

exports.register = (req, res) => {
  const { id, nome, email, senha, isAdmin, isActive } = req.body;
  if (!id || !nome || !email || !senha || isAdmin === undefined || isActive === undefined) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }
  try {
    const user = userService.createUser({ id, nome, email, senha, isAdmin, isActive });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const user = userService.updateUser(id, updates);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
  res.json(user);
};

exports.search = (req, res) => {
  const { query } = req.query;
  const result = userService.findUserByNameOrEmail(query || '');
  res.json(result);
};