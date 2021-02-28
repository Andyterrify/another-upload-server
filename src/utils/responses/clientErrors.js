import { BadRequest, Conflict, Created } from '../codes';

export default {
  missingField: async (res, field) => res.status(BadRequest).json({
    error: `Missing field '${field}'`,
  }),
  userExists: async (res) => res.status(Conflict).json({ error: 'User exists' }),
};
