import argon2 from 'argon2';
import userSchema from '../models/userModel';

export default {
  createUser: async (req) => {
    const hashPassword = await argon2.hash(req.body.password);

    return new Promise((resolve, reject) => {
      try {
        resolve(userSchema.create({
          username: req.body.username,
          displayName: req.body.displayName,
          email: req.body.email,
          password: hashPassword,
        }));
      } catch (err) {
        reject(err);
      }
    });
  },
  findUserUsername: async (req) => new Promise((resolve, reject) => {
    try {
      // TODO: Change to find by ID once you get cookies implemented
      const user = userSchema.findOne({ username: req.body.username }).exec();
      resolve(user);
    } catch (err) {
      reject(err);
    }
  }),
};
