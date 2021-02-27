import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import {
  Created, OK, Unauthorized, NoContent, InternalServerError,
} from '../utils/codes';
import userSchema from '../models/userModel';
import createAccessToken from '../utils/createAccessToken';
import hashToken from '../utils/hashToken';

export default {
  register: async (req, res) => {
    try {
      await userSchema.create({
        username: req.body.username,
        displayName: req.body.displayName,
        email: req.body.email,
        password: await argon2.hash(req.body.password),
      });
    } catch (err) {
      return res.sendStatus(InternalServerError);
    }
    return res.sendStatus(Created);
  },
  login: async (req, res) => {
    if (!await argon2.verify(req.dbUser.password, req.body.password)) {
      return res.status(Unauthorized).json({ error: 'Password does not match' });
    }

    // ! Somehow ending with less entries than there should be?
    // ! in 10 requests there are less than 10 hashes on the server
    const accessToken = createAccessToken(req.dbUser);
    const refreshToken = jwt.sign({ id: req.dbUser.id }, process.env.JWT_REFRESH_SECRET);
    const hashedToken = hashToken(refreshToken);

    try {
      await userSchema.findByIdAndUpdate(req.dbUser.id,
        { $addToSet: { refreshTokens: hashedToken } }).exec();
    } catch (err) {
      if (err) return res.status(InternalServerError).json(err);
    }
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
