import { Created } from '../codes';

export default {
  userCreated: async (res) => res.sendStatus(Created),
  authenticated: async (res, acc, ref) => res.status(Created).cookie('refreshCookie', ref, { httpOnly: true }).json({ accessToken: acc }),
};
