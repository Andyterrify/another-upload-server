import codes from './codes';

export default {
  missingField: async (res, field) => res.status(codes.BadRequest).json({
    error: `Missing field '${field}'`,
  }),
  duplicateField: async (res, err) => {
    const field = Object.keys(err.keyValue);
    return res
      .status(codes.Conflict)
      .json({ error: `An account with field '${field}' already exists.` });
  },
};
