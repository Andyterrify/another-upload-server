import argon2 from 'argon2';
import {
  Created, OK, Unauthorized, NoContent, InternalServerError,
} from '../utils/codes';
import userSchema from '../models/userModel';
import createToken from '../utils/createToken';
import hashToken from '../utils/hashToken';
import mongo from '../utils/dbMongo';

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

    // ! Somehow ending with less entries than there should be?
    // ! in 10 requests there are less than 10 hashes on the server
    const accessToken = createToken.access(req.user);
    // TODO: move refresh tokens to their own model
    const refreshToken = createToken.refresh(req.user);
    // ! change hash to argon2
    // const hashedToken = hashToken(refreshToken);

    // try {
    //   await userSchema.findByIdAndUpdate(req.dbUser.id,
    //     { $addToSet: { refreshTokens: hashedToken } }).exec();
    // } catch (err) {
    //   if (err) return res.status(InternalServerError).json(err);
    // }
    return res.status(Created).json({ accessToken, refreshToken });
  },
  verify: async (req, res) => res.json({ status: 'Successfully Verified', id: req.dbUserId }),
  refresh: async (req, res) => {
    // TODO: Wrap in try
    const dbUser = await userSchema.findById(req.dbUserId).exec();
    const dbTokens = dbUser.refreshTokens;
    const hashedToken = hashToken(req.body.token);
    if (!dbTokens.includes(hashedToken)) return res.sendStatus(Unauthorized);

    const accessToken = createAccessToken(dbUser);
    return res.status(OK).json(accessToken);
  },
  logout: async (req, res) => {
    // TODO: Wrap in try
    await userSchema.findByIdAndUpdate(req.dbUserId,
      { $pull: { refreshTokens: hashToken(req.body.token) } }, (err) => {
        if (err) return res.sendStatus(InternalServerError);
        return res.sendStatus(NoContent);
      });
  },
};
