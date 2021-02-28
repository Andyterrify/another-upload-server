import { BadRequest, Conflict, Created } from '../codes';

export default {
  userCreated: async (res) => res.sendStatus(Created),
};
