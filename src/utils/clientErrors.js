import { BadRequest, Conflict } from './codes';

export default {
  missingField: async (res, field) => res.status(BadRequest).json({
    error: `Missing field '${field}'`,
  }),
  userExists: async (res) => res.status(Conflict).json({ error: 'An account with that username already exists' }),
};
