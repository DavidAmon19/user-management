const jwt = require('jsonwebtoken');

const authMiddleware = {
  verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7, authHeader.length) 
      : authHeader;

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
    authMiddleware.verifyToken(req, res, () => {
      if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Acesso restrito a administradores' });
      }
      next();
    });
  },

  verifySelfOrAdmin(req, res, next) {
    authMiddleware.verifyToken(req, res, () => {
      if (req.userRole !== 'admin' && req.userId !== parseInt(req.params.id)) {
        return res.status(403).json({ error: 'Acesso negado' });
      }
      next();
    });
  },
};

module.exports = authMiddleware;
