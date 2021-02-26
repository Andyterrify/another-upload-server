import argon from 'argon2';
import jwt from 'jsonwebtoken';
import { Created } from '../utils/codes';
import userModel from '../models/userModel';

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
    const user = { name: req.body.username };
    return res.status(Created).json({
      accessToken: jwt.sign(user, process.env.JWT_ACCESS_SECRET),
    });
  },
  verify: (req, res) => res.json({ status: 'Successfully Verified', user: req.user.name }),
  login: async (req, res) => {

  },
};
