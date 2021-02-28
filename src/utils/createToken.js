import jwt from 'jsonwebtoken';
import { createRefreshToken } from './dbMongo';
import getExpiryDate from './getExpiryDate';
import hashToken from './hashToken';

function access(user) {
  return new Promise((resolve, reject) => {
    jwt.sign({
      id: user.id,
      username: user.unsername,
      displayName: user.displayName,
      email: user.email,
      access: user.access,
    }, process.env.JWT_ACCESS_SECRET, { expiresIn: '12d' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

function refresh(user) {
  return new Promise((resolve, reject) => {
    const expDate = getExpiryDate();
    const token = jwt.sign({
      userId: user.id,
      exp: expDate.getTime(),
    }, process.env.JWT_REFRESH_SECRET);
    const hashedToken = hashToken(token);

    const tokenData = {
      userId: user.id,
      tokenHash: hashedToken,
      expiresAt: expDate,
    };

    try {
      createRefreshToken(tokenData);
      resolve(token);
    } catch (err) {
      reject(err);
    }
  });
}

export default {
  access, refresh,
};
