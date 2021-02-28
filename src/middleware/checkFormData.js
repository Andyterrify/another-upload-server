import clientErrors from '../utils/responses/clientErrors';

// TODO: Sanitize

export default {
  register: async (req, res, next) => {
    if (!req.body.username) return clientErrors.missingField(res, 'username');
    if (!req.body.password) return clientErrors.missingField(res, 'password');
    if (!req.body.displayName) return clientErrors.missingField(res, 'displayName');
    return next();
  },
  login: async (req, res, next) => {
    if (!req.body.username) return clientErrors.missingField(res, 'username');
    if (!req.body.password) return clientErrors.missingField(res, 'password');
    return next();
  },
};
