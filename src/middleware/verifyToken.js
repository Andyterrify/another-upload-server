import jwt from 'jsonwebtoken';
import {
  BadRequest, InternalServerError, Unauthorized,
} from '../utils/codes';
import { findBlacklistedToken, findRefreshToken, findUserById } from '../utils/dbMongo';
import extractToken from '../utils/extractToken';
// import hashToken from '../utils/hashToken';
// import userModel from '../models/userModel';
import clientErrors from '../utils/responses/clientErrors';
import serverErrors from '../utils/responses/serverErrors';

async function access(req, res, next) {
  if (!req.headers.authorization) return res.status(BadRequest).json({ error: 'Missing token' });
  try {
    const token = await extractToken(req.headers.authorization);

    // validate
    try {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      return clientErrors.invalidToken(res);
    }
    // check blacklisted
    try {
      const tok = await findBlacklistedToken(token);
      if (tok) return clientErrors.permissionDenied(res);
    } catch (err) {
      return res.status(InternalServerError).json(err);
    }
    // get associated user
    try {
      req.user = await findUserById(jwt.decode(token).id);
    } catch (err) {
      return serverErrors.serverError(res, err);
    }

    return next();
  } catch (err) {
    return res.sendStatus(InternalServerError);
  }
}

async function refresh(req, res, next) {
  if (!req.cookies.refreshCookie) return clientErrors.missingCookie(res);
  const token = req.cookies.refreshCookie;

  // TODO: Sanitize

  try {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return res.status(Unauthorized).json({ message: 'Invalid token' });
  }

  try {
    const dbToken = await findRefreshToken(token);
    if (!dbToken) return clientErrors.invalidToken(res);

    const user = await findUserById(dbToken.userId);
    req.user = user;
    req.token = dbToken;

    return next();
  } catch (err) {
    return res.sendStatus(InternalServerError);
  }
}

export default { access, refresh };
