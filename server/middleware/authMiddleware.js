const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ error: 'Authorization token required' });

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = requireAuth;
