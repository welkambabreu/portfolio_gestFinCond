const jwt = require('jsonwebtoken');
const { users } = require('../database/inMemoryDb');
const { SECRET } = require('../middlewares/authMiddleware');

exports.login = (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }
  const user = users.find(u => u.email === email && u.isActive);
  if (!user) return res.status(401).json({ error: 'Usuário não encontrado ou inativo.' });
  if (!user.senha || user.senha !== senha) {
    return res.status(401).json({ error: 'Senha inválida.' });
  }
  const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, SECRET, { expiresIn: '1h' });
  res.json({ token });
};