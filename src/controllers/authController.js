import argon2 from 'argon2';
import {
  Created, InternalServerError,
} from '../utils/codes';
import createToken from '../utils/createToken';
import { findByUsername } from '../utils/dbMongo';
import clientErrors from '../utils/responses/clientErrors';
import clientResponses from '../utils/responses/clientResponses';
import serverErrors from '../utils/responses/serverErrors';

export default {
  register: async (req, res) => {
    try {
      if (await db.findByUsername(req.body.username)) return clientErrors.userExists(res);
      await db.createUser(req);
      return clientResponses.userCreated(res);
    } catch (err) {
      return serverErrors.serverError(res, err);
    }
  },
  login: async (req, res) => {
    try {
      const user = await findByUsername(req.body.username);
      if (!user) return clientErrors.userDoesNotExist;
      req.user = user;
    } catch (err) {
      return serverErrors.serverError(res, err);
    }

    if (!await argon2.verify(req.user.password, req.body.password)) {
      return clientErrors.passwordsDoNotMatch(res);
    }

    // Authenticated
    const accessToken = await createToken.access(req.user);
    const refreshToken = await createToken.refresh(req.user);

    return clientResponses.authenticated(res, accessToken, refreshToken);
  },
  verify: async (req, res) => {
    const a = 'a';

    return res.json({
      status: 'Successfully Verified',
      user: req.user,
      refreshToken: req.cookies.refreshCookie,
    });
  },
  refresh: async (req, res) => {
    try {
      req.token.delete();
    } catch (err) {
      return serverErrors.serverError(res, err);
    }
    const accessToken = await createToken.access(req.user);
    const refreshToken = await createToken.refresh(req.user);

    return clientResponses.authenticated(res, accessToken, refreshToken);
  },
  logout: async (req, res) => {
    // TODO: Wrap in try
    try {
      req.token.delete();
    } catch (err) {
      return res.sendStatus(InternalServerError);
    }

    return res.clearCookie('refreshCookie').send();
  },
};
