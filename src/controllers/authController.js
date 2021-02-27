import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import refreshTokenModel from '../models/refreshTokenModel';
import {
  Created, OK, Unauthorized, NoContent, InternalServerError, NotFound,
} from '../utils/codes';
import createToken from '../utils/createToken';
import mongo from '../utils/dbMongo';
import getExpiryDate from '../utils/getExpiryDate';
import hashToken from '../utils/hashToken';
import blackAccToken from '../models/blackAccToken';

export default {
  register: async (req, res) => {
    try {
      const user = await mongo.createUser(req);
      res.status(Created).json({ user });
    } catch (err) {
      res.status(InternalServerError).json(err);
    }
  },
  login: async (req, res) => {
    try {
      req.user = await mongo.findUserUsername(req);
    } catch (err) {
      return res.status(InternalServerError).json(err);
    }

    if (!await argon2.verify(req.user.password, req.body.password)) {
      return res.status(Unauthorized).json({ error: 'Password does not match' });
    }

    // Authenticated
    const accessToken = createToken.access(req.user);
    const refreshToken = await createToken.refresh(req.user);

    return res.status(Created).cookie('refreshCookie', refreshToken,
      { httpOnly: true }).json({ accessToken });
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
