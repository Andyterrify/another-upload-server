import jwt from 'jsonwebtoken';

export function createAccessToken(user) {
  return jwt.sign(
    { user: user.name },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '20s' },
  );
}

export default createAccessToken;
