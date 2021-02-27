import jwt from 'jsonwebtoken';
import { BadRequest, Forbidden, InternalServerError } from '../utils/codes';

const pattern = /(?<=Bearer )([a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+)/g;

function access(req, res, next) {
  if (!req.headers.authorization) return res.status(BadRequest).json({ error: 'Missing token' });
  try {
    const token = req.headers.authorization.match(pattern)[0];
    req.dbUserId = jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
      if (err) return res.status(Forbidden).json({ error: 'Invalid token' });
      return user.id;
    });
    return next();
  } catch (err) {
    return res.sendStatus(InternalServerError);
  }
}

function refresh(req, res, next) {
  if (!req.body.token) return res.status(BadRequest).json({ error: 'Missing token' });

  try {
    // TODO: Sanitize
    const { token } = req.body;
    req.dbUserId = jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.status(Forbidden).json({ error: 'Invalid token' });
      return user.id;
    });
    return next();
  } catch (err) {
    return res.sendStatus(InternalServerError);
  }
}

export default { access, refresh };
