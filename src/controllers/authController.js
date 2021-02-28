import argon2 from 'argon2';
import {
  Created, InternalServerError,
} from '../utils/codes';
import createToken from '../utils/createToken';
import db from '../utils/dbMongo';
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
      const user = await db.findByUsername(req.body.username);
      if (!user) return clientErrors.userDoesNotExist;
      req.user = user;
    } catch (err) {
      return serverErrors.serverError(res, err);
    }

    if (!await argon2.verify(req.user.password, req.body.password)) {
      return clientErrors.passwordsDoNotMatch(res);
    }

    // Authenticated
    const accessToken = createToken.access(req.user);
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
    // TODO: Wrap in try

    try {
      req.token.delete();
    } catch (err) {
      return res.sendStatus(InternalServerError);
    }
    // removed old refresh cookie

    const accessToken = createToken.access(req.user);
    const refreshToken = await createToken.refresh(req.user);

    // return res.status(Created).cookie('refreshCookie', refreshToken,
    //   { httpOnly: true }).json({ accessToken });
    return res.status(Created).cookie('refreshCookie', refreshToken).json({ accessToken });
  },
  logout: async (req, res) => {
    // TODO: Wrap in try
    try {
      req.token.delete();
    } catch (err) {
      return res.sendStatus(InternalServerError);
    }

    // try {
    //   const accessToken = req.headers.authorization.split(' ')[1];
    //   // jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    //   blackAccToken.create({ token: accessToken }).catch((err) => {
    //     console.log('And here');
    //   });
    // } catch (err) {
    //   console.log('Here');
    //   return res.status(NoContent).clearCookie('accessCookie').clearCookie('refreshCookie');
    // }
    return res.clearCookie('refreshCookie').send();
  },
};
