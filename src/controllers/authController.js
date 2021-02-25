import argon from 'argon2';
import codes from '../utils/codes';
import userModel from '../models/userModel';
import jwt from '../utils/createJWT';

export default {
  register: async (req, res) => {
    try {
      const user = await userModel.create({
        username: req.body.username,
        displayName: req.body.displayName,
        email: req.body.email,
        password: await argon.hash(req.body.password),
      });
      // TODO: Need to return a JWT

      return res.status(codes.Created).json(jwt.create(user));
    } catch (err) {
      // implement other errors
      console.log(err);
      return res.status(codes.InternalServerError).json(err);
    }
  },
  login: async (req, res) => {

  },
};
