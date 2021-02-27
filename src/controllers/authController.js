import argon2 from 'argon2';
import {
  Created, OK, Unauthorized, NoContent, InternalServerError,
} from '../utils/codes';
import createToken from '../utils/createToken';
import mongo from '../utils/dbMongo';
import getExpiryDate from '../utils/getExpiryDate';

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
    const expDate = getExpiryDate();
    const refreshToken = createToken.refresh(req.user, expDate.getTime());
    const hashedToken = await argon2.hash(refreshToken);

    const tokenData = {
      userId: req.user.id,
      tokenHash: hashedToken,
      expiresAt: expDate,
    };

    try {
      req.token = await mongo.createRefreshToken(tokenData);
    } catch (err) {
      return res.status(InternalServerError).json(err);
    }

    return res.status(Created).cookie('refreshCookie', refreshToken,
      { httpOnly: true }).json({ accessToken });
  },
  verify: async (req, res) => {
    const d = getExpiryDate();

    return res.json({
      status: 'Successfully Verified',
      id: req.dbUserId,
      refreshToken: req.cookies.refreshCookie,
      date: d,
    });
  },
  refresh: async (req, res) => {
    // TODO: Wrap in try
    const dbUser = await userModel.findById(req.dbUserId).exec();
    const dbTokens = dbUser.refreshTokens;
    const hashedToken = hashToken(req.body.token);
    if (!dbTokens.includes(hashedToken)) return res.sendStatus(Unauthorized);

    const accessToken = createAccessToken(dbUser);
    return res.status(OK).json(accessToken);
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
