import {
  BadRequest, Conflict, Created, InternalServerError,
} from '../codes';

export default {
  serverError: async (res, err) => res.status(InternalServerError).json({ err }),
};
