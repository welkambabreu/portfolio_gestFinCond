const jwt = require('jsonwebtoken');
const { users } = require('../database/inMemoryDb');

const SECRET = 'gestfincond_secret';

function authenticateToken(req, res, next) {
  if (req.path === '/users/register' || req.path === '/auth/login') return next();
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido.' });
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido.' });
    req.user = user;
    next();
  });
}

function authorizeAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Usuário não autenticado.' });
  const userData = users.find(u => u.id === req.user.id);
  if (!userData || !userData.isAdmin) return res.status(403).json({ error: 'Acesso restrito a administradores.' });
  next();
}

function authorizeUserOrAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Usuário não autenticado.' });
  const userData = users.find(u => u.id === req.user.id);
  if (!userData || (!userData.isAdmin && req.method !== 'GET')) return res.status(403).json({ error: 'Acesso restrito.' });
  next();
}

module.exports = {
  authenticateToken,
  authorizeAdmin,
  authorizeUserOrAdmin,
  SECRET,
};