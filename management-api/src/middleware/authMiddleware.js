const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido' });
      }

      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  },

  verifyAdmin(req, res, next) {
    this.verifyToken(req, res, () => {
      if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Acesso restrito a administradores' });
      }
      next();
    });
  },

  verifySelfOrAdmin(req, res, next) {
    this.verifyToken(req, res, () => {
      if (req.userRole !== 'admin' && req.userId !== parseInt(req.params.id)) {
        return res.status(403).json({ error: 'Acesso negado' });
      }
      next();
    });
  },
};
