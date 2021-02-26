import jwt from 'jsonwebtoken';
import { Forbidden, Unauthorized } from '../utils/codes';

function verify(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(Unauthorized);

  // TODO: maybe have two separate tokens, one for dash and one for api? check in here
  req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.status(Forbidden).json({ err });
    return user;
  });
  return next();
}

export default verify;
