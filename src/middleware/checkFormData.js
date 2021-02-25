import clientErrors from '../utils/clientErrors';
import user from '../models/userModel';

export default {
  // Check if all the required data for registering is provided
  register: async (req, res, next) => {
    if (typeof req.body.username === 'undefined') return clientErrors.missingField(res, 'username');
    if (await user.findOne({ username: req.body.username }) !== null) {
      return clientErrors.userExists(res, req.body.username);
    }

    if (typeof req.body.password === 'undefined') return clientErrors.missingField(res, 'password');
    if (typeof req.body.displayName === 'undefined') return clientErrors.missingField(res, 'displayName');
    return next();
  },
};
