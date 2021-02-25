import codes from './codes';

export default {
  missingField: async (res, field) => res.status(codes.BadRequest).json({
    error: `Missing field '${field}'`,
  }),
  userExists: async (res, username) => res.status(codes.Conflict).json({ error: `An account with field '${username}' already exists` }),
};
