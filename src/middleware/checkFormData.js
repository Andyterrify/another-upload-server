import clientErrors from '../utils/clientErrors';
import userModel from '../models/userModel';
import { InternalServerError, NotFound } from '../utils/codes';

// TODO: Sanitize
// !: should I be checking if the user exists here?

export default {
  // Check if all the required data for registering is provided
  register: async (req, res, next) => {
    if (typeof req.body.username === 'undefined') return clientErrors.missingField(res, 'username');
    if (await userModel.findOne({ username: req.body.username })) {
      return clientErrors.userExists(res);
    }
    if (typeof req.body.password === 'undefined') return clientErrors.missingField(res, 'password');
    if (typeof req.body.displayName === 'undefined') return clientErrors.missingField(res, 'displayName');
    return next();
  },
  login: async (req, res, next) => {
    if (typeof req.body.password === 'undefined') return clientErrors.missingField(res, 'password');
    try {
      const user = await userModel.findOne({ username: req.body.username });
      if (!user) return res.status(NotFound).json({ error: 'User not found' });
    } catch (err) {
      if (err) return res.status(InternalServerError).json(err);
    }
    return next();
  },
};
