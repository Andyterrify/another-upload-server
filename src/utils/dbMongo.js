import argon2 from 'argon2';
import blackAccToken from '../models/blackAccToken';
import refreshTokenModel from '../models/refreshTokenModel';
import userModel from '../models/userModel';
import hashToken from './hashToken';

async function findByUsername(username) {
  return new Promise((resolve, reject) => {
    userModel.findOne({ username }, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

async function findUserById(id) {
  return new Promise((resolve, reject) => userModel.findById(id, (err, user) => {
    if (err) return reject(err);
    return resolve(user);
  }));
}

async function createUser(req) {
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
}

async function findRefreshToken(token) {
  return new Promise((resolve, reject) => {
    const hash = hashToken(token);
    return refreshTokenModel.findOne({ tokenHash: hash }, (err, refreshToken) => {
      if (err) return reject(err);
      return resolve(refreshToken);
    });
  });
}

async function createRefreshToken(tokenData) {
  return new Promise((resolve, reject) => {
    refreshTokenModel.create(tokenData).then((token) => {
      resolve(token);
    }).catch((err) => {
      reject(err);
    });
  });
}

async function findBlacklistedToken(token) {
  return new Promise((resolve, reject) => blackAccToken.findOne({ token }, (err, found) => {
    if (err) return reject(err);
    return resolve(found);
  }));
}

export {
  createUser,
  findRefreshToken,
  createRefreshToken,
  findUserById,
  findByUsername,
  findBlacklistedToken,
};
