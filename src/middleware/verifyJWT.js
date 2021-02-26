import jwt from 'jsonwebtoken';
import { Forbidden, Unauthorized } from '../utils/codes';

function verify(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(Unauthorized);

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.status(Forbidden).json({ err });
    req.user = user;
    return next();
  });
  return null; // TODO: NOT CORRECT
}

export default verify;
