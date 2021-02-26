import argon from 'argon2';
import jwt from 'jsonwebtoken';
import {
  Created, Forbidden, NoContent, OK, Unauthorized,
} from '../utils/codes';
import userModel from '../models/userModel';
import createAccessToken from '../utils/createAccessToken';

let refreshTokens = [];

export default {
  register: async (req, res) => {
  // try {
  //   const user = await userModel.create({
  //     username: req.body.username,
  //     displayName: req.body.displayName,
  //     email: req.body.email,
  //     password: await argon.hash(req.body.password),
  //   });
  //   // TODO: Need to return a JWT

    //   return res.status(codes.Created).json(jwt.create(user));
    // } catch (err) {
    //   // implement other errors
    //   console.log(err);
    //   return res.status(codes.InternalServerError).json(err);
  },
  login: async (req, res) => {
    const user = { name: req.body.username };

    const accessToken = createAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET);
    refreshTokens.push(refreshToken);

    return res.status(Created).json({ accessToken, refreshToken });
  },
  verify: async (req, res) => res.json({ status: 'Successfully Verified', user: req.user.name }),
  refresh: async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(Unauthorized);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(Forbidden);

    const accessToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.status(Forbidden).json(err);
      return createAccessToken(user);
    });
    res.status(OK).json(accessToken);
  },
  logout: async (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(NoContent);
  },
};
