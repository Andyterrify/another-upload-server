import jwt from 'jsonwebtoken';
import {
  BadRequest, Forbidden, InternalServerError, Unauthorized,
} from '../utils/codes';
import mongo from '../utils/dbMongo';
import hashToken from '../utils/hashToken';
import userModel from '../models/userModel';
import blackAccToken from '../models/blackAccToken';

const pattern = /(?<=Bearer )([a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+)/g;

// TODO: Make async
// TODO: Add user to req.user
function access(req, res, next) {
  if (!req.headers.authorization) return res.status(BadRequest).json({ error: 'Missing token' });
  try {
    const token = req.headers.authorization.match(pattern)[0];

    try {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      return res.status(Unauthorized).json({ message: 'Invalid token' });
    }

    try {
      if (blackAccToken.findOne({ token })) return res.status(Unauthorized).json({ message: 'Invalid token' });
    } catch (err) {
      return res.status(InternalServerError).json(err);
    }

    return next();
  } catch (err) {
    return res.sendStatus(InternalServerError);
  }
}

async function refresh(req, res, next) {
  if (!req.cookies.refreshCookie) return res.status(BadRequest).json({ error: 'Missing cookie' });
  const token = req.cookies.refreshCookie;

  // TODO: Sanitize

  try {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return res.status(Unauthorized).json({ message: 'Invalid token' });
  }

  try {
    const dbToken = await mongo.findRefreshToken(hashToken(token));
    if (!dbToken) return res.status(Unauthorized).json({ message: 'Invalid token' });

    const user = await userModel.findById(dbToken.userId).exec();
    req.user = user;
    req.token = dbToken;

    return next();
  } catch (err) {
    return res.sendStatus(InternalServerError);
  }
}

export default { access, refresh };
