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

    // ! Somehow ending with less entries than there should be?
    // ! in 10 requests there are less than 10 hashes on the server
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

    return res.status(Created).cookie('refreshCookie', refreshToken,
      { httpOnly: true }).json({ accessToken });
  },
  logout: async (req, res) => {
    // TODO: Wrap in try
    await userModel.findByIdAndUpdate(req.dbUserId,
      { $pull: { refreshTokens: hashToken(req.body.token) } }, (err) => {
        if (err) return res.sendStatus(InternalServerError);
        return res.sendStatus(NoContent);
      });
  },
};
