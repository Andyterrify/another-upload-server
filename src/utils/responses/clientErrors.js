import {
  BadRequest, Conflict, NotFound, Unauthorized,
} from '../codes';

export default {
  missingField: async (res, field) => res.status(BadRequest).json({
    error: `Missing field '${field}'`,
  }),
  userExists: async (res) => res.status(Conflict).json({ error: 'User exists' }),
  userDoesNotExist: async (res) => {
    console.log('Here');
    res.status(NotFound).json({ error: 'User does dor exist' });
  },
  passwordsDoNotMatch: async (res) => res.status(Unauthorized).json({ error: 'Password does not match' }),
  missingCookie: async (res) => res.status(BadRequest).json({ error: 'Missing cookie' }),
  invalidToken: (res) => res.status(Unauthorized).json({ error: 'Invalid token' }),
  permissionDenied: (res) => res.status(Unauthorized).json({ error: 'Permission denied' }),
};
