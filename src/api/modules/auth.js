import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = signToken(req.body.username);
  res.json({ token });
};

export const signToken = username =>
  jwt.sign({ username }, 'mysupersecretkey', { expiresIn: '3 hours' });
