import argon2 from 'argon2';
import refreshTokenModel from '../models/refreshTokenModel';
import userModel from '../models/userModel';
import serverErrors from './responses/serverErrors';

async function findByUsername(username) {
  return new Promise((resolve, reject) => {
    userModel.findOne({ username }, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

export default {
  createUser: async (req) => {
    const hashPassword = await argon2.hash(req.body.password);

    return new Promise((resolve, reject) => {
      userModel.create({
        username: req.body.username,
        displayName: req.body.displayName,
        email: req.body.email,
        password: hashPassword,
      }).then((user) => {
        resolve(user);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // findUserUsername: async (req) => new Promise((resolve, reject) => {
  //   try {
  //     // TODO: Change to find by ID once you get cookies implemented
  //     const user = userModel.findOne({ username: req.body.username }).exec();
  //     resolve(user);
  //   } catch (err) {
  //     reject(err);
  //   }
  // }),
  // findRefreshToken: async (tokenHash) => new Promise((resolve, reject) => {
  //   try {
  //     const refreshToken = refreshTokenModel.findOne({ tokenHash }).exec();
  //     resolve(refreshToken);
  //   } catch (err) {
  //     reject(err);
  //   }
  // }),
  createRefreshToken: async (tokenData) => new Promise((resolve, reject) => {
    refreshTokenModel.create(tokenData).then((token) => {
      resolve(token);
    }).catch((err) => {
      reject(err);
    });
  }),
  findByUsername,
};
